CREATE TABLE companies (
handle TEXT PRIMARY KEY,
name TEXT NOT NULL UNIQUE,
num_employees INTEGER,
description TEXT,
logo_url TEXT
);

CREATE TABLE jobs (
id SERIAL PRIMARY KEY,
title TEXT NOT NULL,
salary FLOAT NOT NULL,
equity FLOAT NOT NULL CHECK (equity < 1),
company_handle TEXT REFERENCES companies,
date_posted DATE
);

CREATE TABLE users (
username TEXT PRIMARY KEY,
password TEXT NOT NULL,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
email TEXT,
photo_url TEXT,
is_admin BOOLEAN NOT NULL DEFAULT 'false'
);