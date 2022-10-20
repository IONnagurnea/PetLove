const pool = require("../db");
const AWS = require('aws-sdk');
const nanoid = require('nanoid');
const {readFileSync} = require("fs");

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
};
const S3 = new AWS.S3(awsConfig);

const uploadImage = async(req, res) => {
    //console.log(req.body.images);
    try {
        const { images } = req.body;
        //console.log("this images => ", images);
        if(!images) return res.status(400).send("No image");
        
        // prepare the image
        let ResponseData = []
        images.map((item) => {

            const base64Data = new Buffer.from(
                item.replace(/^data:image\/\w+;base64,/,""),
                "base64"
            );
            const type = item.split(';')[0].split('/')[1];
            //image params
            const params = {
                Bucket: "petloves",
                Key: `${nanoid()}.${type}`, 
                Body: base64Data,
                ACL: "public-read",
                ContentEncoding: "base64",
                ContentType: `image/${type}`,
            };

            // upload to S3
            S3.upload(params, (err, data) => {
                if(err) {
                    console.log(err);
                    return res.sendStatus(400);
                } else {
                    ResponseData.push(data);
                    if(ResponseData.length == images.length) {
                        res.json(ResponseData);
                    }
                } 
            });
        });
    } catch (err) {
        console.log(err);
    }  
};

const removeImage = async (req, res) => {
    try {
        const {image} = req.body;
        console.log(image);

        //return // need to find the error
        //image params
        const params = {
            Bucket: "petloves",
            Key: image,
        };

        // send remove request to S3
        S3.deleteObject(params, (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            }
            res.send({ok: true});
        });
    } catch (err) {
        console.log(err);
    }
};

const uploadVideo = async (req, res) => {
    try {

      const { video } = req.files;
      console.log(video);

      if (!video) return res.status(400).send("No video");
  
      // video params
      const params = {
        Bucket: "petloves",
        Key: `${nanoid()}.${video.type.split("/")[1]}`,
        Body: readFileSync(video.path),
        ACL: "public-read",
        ContentType: video.type,
      };
  
      // upload to s3
      S3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        }
        console.log(data);
        res.send(data);
      });
    } catch (err) {
      console.log(err);
    }
};
  
const removeVideo = async (req, res) => {
    try {
     
      const { Bucket, Key } = req.body;
      // console.log("VIDEO REMOVE =====> ", req.body);
  
      // video params
      const params = {
        Bucket,
        Key,
      };
  
      // upload to s3
      S3.deleteObject(params, (err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        }
        console.log(data);
        res.send({ ok: true });
      });
    } catch (err) {
      console.log(err);
    }
};




const postPets = async(req, res) => {
    console.log(req.body);
    const { name, type, breed, gender, age, origin, colour, description, licence, price, vaccinated, images, video} = req.body;
    // const { images.Location } = req.body;
    // const { video.Location } = req.body;
    const userId = req.body.user.id;
    console.log(userId);
    try {
        const createPet =  await pool.query(
            "INSERT INTO pets (users_id, name, type, gender, age, breed, origin, colour, description, licence, price, vaccinated, image_url, video_url) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *",
            [userId, name, type, gender, age, breed, origin, colour, description, licence, price, vaccinated, images, video]
          );
          console.log(createPet);
          res.status(201).json({
            status: "succes",
            data: {
              pet: createPet.rows[0],
            },
          });
    } catch (err) {
        console.log(err);    
    }
};

const getPets = async(req, res) => {
    try {
        const allPets = await pool.query("SELECT pets.id, pets.name, pets.type, pets.gender, pets.age, pets.breed, pets.price, pets.origin, pets.colour, pets.description, pets.licence, pets.vaccinated, pets.image_url, pets.video_url, users.first_name, users.phone, city FROM pets INNER JOIN users on pets.users_id = users.id");
        //console.log('db users =>', allPets);
        res.status(200).json(allPets.rows);
    } catch (err) {
        console.log(err);    
    }
};

module.exports = { 
    postPets, 
    uploadImage, 
    removeImage, 
    uploadVideo, 
    removeVideo,
    getPets  
};