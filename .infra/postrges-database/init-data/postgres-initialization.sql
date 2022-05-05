-- CREATE ROLE "user" LOGIN PASSWORD 'password';

CREATE DATABASE "identix-pass-dev"
    WITH
    OWNER = "developer"
    ENCODING = "UTF8"
    CONNECTION LIMIT = -1;

GRANT ALL PRIVILEGES ON DATABASE "demo-db" TO "user";

