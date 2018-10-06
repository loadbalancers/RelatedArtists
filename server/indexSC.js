// const newRel = require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('../database/indexSCPostGres.js');
// const db = require('../database/indexSCCassandra.js');

const app = express();

app.use(cors());
app.use('/ra-module/:id', express.static(path.join(__dirname, '../public' )))

app.post('*/:id/related-artists/', (req, res) => {
  var newArtistRel = [['Sophia Chiu',  //req.body.ArtistName
                       3,                     //req.body.Followers
                       ' https://s3.amazonaws.com/spotifyphotos/999.jpg', //req.body.PhotoLink,
                       ' blahdi blah blah boop'   //req.body.TrackName
                      ], 
                      [req.params.id,2,3,4,5,6,7]];
  db.postNewLinks(newArtistRel, (err, result) => {
    if (err) {
      return console.log('POST error', err);
    } else {
      res.status(201).send("POSTED!");
    }
  })
})  
 
app.get('*/:id/related-artists', (req, res) => {
  db.getRelArtists(req.params.id, (err, result) => {
    if (err) {
      console.log('GET error', err);
    } else {
      res.send(result);
    }
  })
})

app.put('*/:id/related-artists/:artistId', (req, res) => {
  db.updateRelatedArtistInfo([[req.params.id, req.params.artistId], ["ArtistName", "Sophaphia"]], (err, result) => {
    if (err) {
      console.log('PUT error', err);
    } else {
      res.send(201, "PUT success!: ", result);
    }
  })
})

app.delete('*/:id/delete-artists/:artistId', (req, res) => {
  db.removeRelatedArtist([req.params.id, req.params.artistId], (err, result) => {
    if (err) {
      console.log('DELETE error', err);
    } else {
      res.status(201).send(result);
    }
  })
})



app.listen(3005, () => console.log('listening on port 3005'))