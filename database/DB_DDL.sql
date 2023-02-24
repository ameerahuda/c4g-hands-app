CREATE DATABASE c4g_hands_db IF NOT EXISTS;

use c4g_hands_db;

CREATE TABLE user (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    password VARCHAR(50),
    role VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

describe user;