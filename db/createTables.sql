select * from pg_catalog.pg_tables

create table post(
    post_id serial primary key,
    user_id int,
    title varchar(80),
    message varchar(300),
    img_ref text,
    request boolean,
    bid_accepted boolean,
    link_ref text,
    address text,
    city text,
    state varchar(2),
    zip int
)

create table user_login(
    user_id serial primary key,
    username varchar(30) not null,
    password text not null
)

create table users(
    user_id serial primary key,
    firstname varchar(100),
    lastname varchar(100),
    email text,
    profile_ref text
)