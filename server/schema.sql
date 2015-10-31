CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  msgID integer PRIMARY KEY,
  userID integer NOT NULL,
  roomID integer NOT NULL,
  message text
);

CREATE TABLE rooms (
  rID integer PRIMARY KEY AUTO_INCREMENT,
  roomname varchar(25)
);

CREATE TABLE users (
  uID integer PRIMARY KEY AUTO_INCREMENT,
  username varchar(20)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  CONSTRAINT fk_room_id
    FOREIGN KEY (roomID)
    REFERENCES rooms(rID),
  CONSTRAINT fk_user_id
    FOREIGN KEY (userID)
    REFERENCES users(uID)
 *  to create the database and the tables.*/

