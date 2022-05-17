Note that the files in the example require a table called registeredUsers within the database

Use the following queries:https://github.com/LifuWang-66/24-points-web-project/blob/main/readme.txt

create database 24Points;
use 24Points;
create table registeredUsers(
    username varchar(60) primary key,
    password varchar(60) not null
)

Don't forget to use npm install to install all dependencies
