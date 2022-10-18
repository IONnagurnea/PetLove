const pool = require("../db");
const { hashPassword, comparePassword } = require('../utils/auth');
const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
const nanoid = require('nanoid');
const createError = require('http-errors');

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

const register = async(req, res) => {
    try {
        //console.log("The data =>", req.body)
        const {firstName, lastName, email, password} = req.body.details;
        const {country, state, city} = req.body.address;
        const {phone} = req.body.phone;
        // console.log(firstName);
        // console.log(country.name);
        // console.log(state.name);
        // console.log(city);
        //return;
        let userExist = await pool.query(
            "Select email, phone From users Where email = $1 Or phone = $2",
            [email, phone]
        );
        if (userExist.rowCount !== 0) return res.status(400).send("Email and/or phone is taken")
        // has password
        const hashedPassword = await hashPassword(password);
        const results = await pool.query(
            "INSERT INTO users (first_name , last_name, email, password, country, county, city, phone) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
            [firstName.charAt(0).toUpperCase() + firstName.slice(1), lastName.charAt(0).toUpperCase() + lastName.slice(1), email, hashedPassword, country.name, city.name, phone]
          );
          
          console.log(results);
          res.status(201).json({
            status: "succes",
            data: {
              user: results.rows[0],
            },
          });
    } catch (err) {
        console.log(err);    
    }
};

const login = async(req, res) => {
    try {
        //console.log(req.body);
        const {email, password} = req.body;
        // check if our db has user with that email 
        const user = await pool.query(
            "Select * From users Where email = $1",
            [email]
        );
        //console.log(user);
        if (user.rowCount !== 1) throw createError(401, 'Incorrect email or password');
        // check password
        const match = await comparePassword(password, user.rows[0].password);
        if(!match) throw createError(402, 'Incorrect email or password');
        // create signed jwt
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        // return user and token to client, exclude hashed password
        user.password = undefined;
        // send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, // only works on https
        });
        // send user as json response
        return res.json(user.rows[0]);
    } catch (err) {
        //console.log(err);
        return res.status(400).send(err);
    }
};

const logout = async(req, res) => {
    try {
      res.clearCookie("token")
      return res.json({ message: "Sigout successs"})  
    } catch (err) {
        console.log(err);
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        //console.log(email);
        const shortCode = nanoid(6).toUpperCase();
        const user = await pool.query(
            "UPDATE users SET passwordResetCode = $1 WHERE email = $2",
            [shortCode, email]
        );

        // check if user exist
        if (user.rowCount !== 1) throw createError(401, "User not found");

        //prepare for email
        const params = {
            Source: process.env.EMAIL_FROM,
            Destination: {
                ToAddresses: [email],
            }, 
            Message: {
                Body: {
                  Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <html>
                            <h1>Reset password</h1>
                            <p>Use this code to reset your password</p>
                            <h2 style="color:red">${shortCode}</h2>
                            <i>edemy.com</i>
                        </html>
                    `,
                  },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: "Reset Password",
                },
            },  
        };
        const emailSent = SES.sendEmail(params).promise();
        emailSent.then((data) => {
            //console.log(data);
            return res.json({ok: true});
        })
        .catch((err) => {
            console.log(err);
        })
    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }
};

const resetPassword  = async (req, res) => {
    try {
        const {email, code, newPassword} = req.body;
        console.table({email, code, newPassword});
        const hashedPassword = await hashPassword(newPassword);

        const user = await pool.query(
            "UPDATE users SET password = $1 WHERE (email = $2 AND passwordresetcode = $3)",
            [hashedPassword, email, code]
        );

        //console.log(user);
        if (user.rowCount === 1) return res.status(201).json({ok: true}) 
            throw createError(401, "Wrong code or email");
    } catch (err) {
        //console.log(err);
        return res.status(400).send(err);
    }
}

const sendContact = async (req, res) => {
    try {
        const { email, firstName, phone } = req.body;
        console.log(req.body);

        //prepare for email
        const params = {
            Source: process.env.EMAIL_FROM,
            Destination: {
                ToAddresses: [email],
            }, 
            Message: {
                Body: {
                  Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <html>
                            <h1>Thank You!</h1>
                            <p>This is the contact number you paid for</p>
                            <h2 style="color:green">${firstName}</h2>
                            <h2 style="color:red">${phone}</h2>
                            <i>PetLove</i>
                        </html>
                    `,
                  },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: "Contact Info",
                },
            },  
        };
        const emailSent = SES.sendEmail(params).promise();
        emailSent.then((data) => {
            console.log(data);
            res.json({ok: true});
        })
        .catch((err) => {
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }
};
module.exports = { 
    register, 
    login, 
    logout, 
    forgotPassword,
    resetPassword,
    sendContact
};