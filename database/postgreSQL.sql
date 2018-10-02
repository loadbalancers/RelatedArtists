DROP DATABASE IF EXISTS skybeat;
CREATE DATABASE skybeat;
\c skybeat;

DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
  id SERIAL PRIMARY KEY, 
  ArtistName VARCHAR(60) NOT NULL,
  Followers INT,
  PhotoLink VARCHAR(100),
  TrackName VARCHAR(100)
);

DROP TABLE IF EXISTS artistRelations;

CREATE TABLE artistRelations (
  PRIMARY KEY (ArtistId, RelatedId),
  ArtistId INT NOT NULL, 
  RelatedId INT NOT NULL, 
  FOREIGN KEY (ArtistId) REFERENCES artists (id),
  FOREIGN KEY (RelatedId) REFERENCES artists (id)
)

