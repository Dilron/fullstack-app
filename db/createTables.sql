select * from pg_catalog.pg_tables

create table bid (
    bid_id serial primary key,
    post_id int,
    bidder_id int,
    poster_id int,
    bid_message varchar(300),
    bid_val int,
    printer text,
    est_processing_time int
)

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

create table shipping(
    shipping_id serial primary key,
    user_id int,
    street text,
    city varchar(100),
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