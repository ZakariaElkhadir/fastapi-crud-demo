-- sql script to create db in postgres and inserting some data
CREATE DATABASE mini_project;

-- Connect to the database
\c mini_project;

-- Create table users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (name, email, description)
VALUES
    ('Zakaria', 'zakaria@example.com', 'Front-end developer from Morocco'),
    ('Sara', 'sara@example.com', 'Data analyst and coffee lover'),
    ('Youssef', 'youssef@example.com', 'Backend engineer who enjoys hiking');
