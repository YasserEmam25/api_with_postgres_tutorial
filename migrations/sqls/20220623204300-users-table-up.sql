create table users(
    id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(150) unique not null,
    username varchar(70) not null,
    password varchar(100) not null
);