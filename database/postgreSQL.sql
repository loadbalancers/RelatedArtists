DROP DATABASE IF EXISTS skybeat;
CREATE DATABASE skybeat;
\c skybeat;

CREATE TABLE artists (
  id SERIAL PRIMARY KEY, 
  ArtistName VARCHAR(60) NOT NULL,
  Followers INT,
  PhotoLink VARCHAR(100),
  TrackName VARCHAR(100)
);

CREATE TABLE artistRelations (
  ArtistId INT NOT NULL,
  RelatedId INT NOT NULL,
  FOREIGN KEY (ArtistID) REFERENCES artists(Id),
  FOREIGN KEY (RelatedId) REFERENCES artists(Id)
)
