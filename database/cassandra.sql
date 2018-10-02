
CREATE TABLE artistrelations(
  PRIMARY KEY (mainArtistId, relatedID),
  mainArtistId INT,
  relatedId INT, 
  artistName TEXT,
  followers INT,
  photoLink VARCHAR,
  trackName VARCHAR
)