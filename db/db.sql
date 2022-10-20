CREATE DATABASE petlove;

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    county VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    phone text NOT NULL
);

CREATE TABLE IF NOT EXISTS pets (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    users_id  BIGINT NOT NULL REFERENCES users(id),
    name VARCHAR(20) NOT NULL,
    type VARCHAR(20) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    age INT NOT NULL,
    bread VARCHAR(20) NOT NULL,
    origin VARCHAR(50) NOT NULL,
    colour VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    licence VARCHAR(50),
    price INT,
    vaccinated BOOLEAN NOT NULL,
    image_url text[],
    video_url text    
);
