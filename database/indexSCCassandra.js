const cassandra = require('cassandra-driver');
const db = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  keyspace: 'skybeatrel'
})

const postNewLinks = (newArtistRel, callback) => {
  var promiseArr = [];
  const postOneNewLink = (artistId, relatedId, otherInfo) => {
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO artistrelations 
                   (mainArtistId, relatedId, artistName, followers, photoLink, trackName)
                   VALUES (${artistId}, ${relatedId}, ?, ?, ?, ?);`  
      db.execute(query, otherInfo, { prepare : true }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        } 
      })
    })
  }
  for (var i = 1; i < newArtistRel[1].length; i ++) {
    promiseArr.push(postOneNewLink(newArtistRel[1][0], newArtistRel[1][i], newArtistRel[0]))
  }
  Promise.all(promiseArr).then(value => callback(null, value));
}

// const postNewLink = (newArtistRel, callback) => {
//   for (var i = 1; i < newArtistRel[1].length; i++) {
//     let query = `INSERT INTO artistrelations 
//                  (mainArtistId, relatedId, artistName, followers, photoLink, trackName)
//                  VALUES (${newArtistRel[1][0]}, ${newArtistRel[1][i]}, ?, ?, ?, ?);`  
//     db.execute(query, newArtistRel[0], { prepare : true }, (err, result) => {
//       if (err) {
//         return callback(err, null);
//       } else {
//         callback(null, result);
//       } 
//     })
//   }
// }


const getRelArtists = (artistId, callback) => {
  let query = `SELECT * FROM skybeatrel.artistrelations 
               WHERE mainartistid = ${artistId};`
  db.execute(query, (err, result) => {
    if (err) {
      console.log("error GET!")
      callback(err, null);
    } else {
      console.log(result.rows);
      callback(null, result.rows);
    }
  })
}

const updateRelatedArtistInfo = (artistInfo, callback) => {
  let query = `UPDATE artistrelations 
               SET ${artistInfo[1][0]} = '${artistInfo[1][1]}'
               WHERE mainartistid = ${artistInfo[0][0]}
               AND relatedId = ${artistInfo[0][1]};`
               console.log(query);
  db.execute(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const removeRelatedArtist = (artistRel, callback) => {
  let query = `DELETE FROM artistrelations 
               WHERE mainartistid = ${artistRel[0]} 
               AND relatedId = ${artistRel[1]};`
  db.execute(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

module.exports.postNewLinks = postNewLinks;
module.exports.getRelArtists = getRelArtists;
module.exports.updateRelatedArtistInfo = updateRelatedArtistInfo;
module.exports.removeRelatedArtist = removeRelatedArtist;
