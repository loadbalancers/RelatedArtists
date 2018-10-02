const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use('/ra-module/:id', express.static(path.join(__dirname + '../public' )))

app.post('*/:id/related-artists/:artistId', (req, res) => {
  //creates a new link, 
  //that links new relation to artist id
})  

app.get('*/:id/related-artists', (req, res) => {
  //gets related artist info for main artist
})

app.put('*/:id/related-artists/:artistId', (req, res) => {
  //edits links to artist
})

app.delete('*/:id/delete-artists/:artistId', (req, res) => {
  //removes related artist
})



app.listen(3002, () => console.log('listening on port 3002'))