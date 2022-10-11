CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    city VARCHAR(20) NOT NULL,
    county VARCHAR(20) NOT NULL,
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

INSERT INTO users ( email, password, first_name, last_name) values('nagurneaion@gmail.com', 'ivanuska89', 'John', 'Nagurnea');

ALTER TABLE pets ADD COLUMN bread VARCHAR(20) NOT NULL;
ALTER TABLE pets DROP COLUMN price;


ALTER TABLE users
ADD COLUMN city  VARCHAR(20) NOT NULL,
ADD COLUMN county  VARCHAR(20) NOT NULL,
ADD COLUMN phone text NOT NULL CHECK (phone ~ '^(\d{11}|\d{14})$');

DELETE FROM users
WHERE id = 1;

SELECT pets.id, pets.users_id, pets.name, pets.type, pets.gender, pets.age, pets.bread, pets.price, pets.image_url, users.first_name, users.phone, users.id
FROM pets 
INNER JOIN users on pets.users_id = users.id;