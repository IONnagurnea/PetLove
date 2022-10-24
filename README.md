# petlove website
It is a simplistic dynamic website that is allowing to find male pets for breeders, basically someone that has a male pet not neutered can create an account and add a post, and breeder can find this post and buy the contact detail in this case the phone number of the person that made the post.

## Main technologies
The app is build with React.js framework for front-end and Node/Express REST API for back-end using PostgreSQL as database technology.

## Running the app

To run locally, for back-end run `npm install`, then `npm run dev`

This project requires a PostgreSQL database to be running locally. Use SQL commands from db/db.sql file to create the database and database table and create an .env file with your custom database credintials, please see db/index.js and example.env for enviromental variables required.

The app is using AWS S3 to hold images and videos in S3 bucket and AWS SES to send email a code to user if user forget password and also the details user paied for.

The payment is done through PayPal or Stripe card payment.

To start the front-end cd front-end and run `npm install` and then `npm start`, you can access theapp at `http://localhost:3000`


To interact with the app in live mode please access it at https://petlove-ion.herokuapp.com/.




