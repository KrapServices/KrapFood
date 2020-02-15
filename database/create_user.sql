CREATE TABLE users
(
    ID SERIAL PRIMARY KEY,
    email VARCHAR(30),
    password VARCHAR(30),
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

 