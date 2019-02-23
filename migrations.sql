CREATE DATABASE facebook_clone;
CREATE DATABASE facebook_clone_test;

CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  firstname varchar(50),
  surname varchar(50),
  email varchar(100),
  password varchar(140),
  dob date,
  profilepictureurl varchar(255),
  createdat timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE friends (
  friender int,
  friended int,
  createdat timestamptz NOT NULL DEFAULT NOW(),
  FOREIGN KEY (friender) REFERENCES users(userid),
  FOREIGN KEY (friended) REFERENCES users(userid),
  PRIMARY KEY (friender, friended)
);

CREATE TABLE posts (
  postid SERIAL PRIMARY KEY,
  userid int,
  content varchar(1000),
  createdat timestamptz NOT NULL DEFAULT NOW(),
  FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE comments (
  commentid SERIAL PRIMARY KEY,
  postid int,
  userid int,
  content varchar(1000),
  createdat timestamptz NOT NULL DEFAULT NOW(),
  FOREIGN KEY (postid) REFERENCES posts(postid),
  FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE likes (
  userid int,
  postid int,
  commentid int,
  createdat timestamptz NOT NULL DEFAULT NOW(),
  FOREIGN KEY (userid) REFERENCES users(userid),
  FOREIGN KEY (postid) REFERENCES posts(postid),
  FOREIGN KEY (commentid) REFERENCES comments(commentid),
  PRIMARY KEY (userid, postid, commentid)
);

CREATE TABLE photos (
  photoid SERIAL PRIMARY KEY,
  postid int,
  commentid int,
  url varchar(255),
  createdat timestamptz NOT NULL DEFAULT NOW(),
  FOREIGN KEY (postid) REFERENCES posts(postid),
  FOREIGN KEY (commentid) REFERENCES comments(commentid)
);