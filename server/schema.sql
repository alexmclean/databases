CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  rID integer PRIMARY KEY AUTO_INCREMENT UNIQUE,
  roomname varchar(25) UNIQUE
);

CREATE TABLE users (
  uID integer PRIMARY KEY AUTO_INCREMENT UNIQUE,
  username varchar(20) UNIQUE
);

CREATE TABLE messages (
  msgID integer PRIMARY KEY AUTO_INCREMENT UNIQUE,
  userID integer NOT NULL,
  roomID integer NOT NULL,
  message text,
  FOREIGN KEY (roomID) REFERENCES rooms(rID),
  FOREIGN KEY (userID) REFERENCES users(uID)
);
/* Create other tables and define schemas for them here! */
