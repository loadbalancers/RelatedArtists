const { Client } = require('pg');
const psql = new Client({
  database: 'skybeat',
});

psql.connect();

const linkPromise = (artistId, resultsId) => {
  return new Promise((resolve, reject) => {
    let jointQuery = `INSERT INTO artistRelations VALUES (
                      ${artistId}, ${resultsId});`
    psql.query(jointQuery, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  }) 
}

const postNewLinks = (newArtistRel, callback) => {
  let query = `INSERT INTO artists (ArtistName, Followers, PhotoLink, TrackName)
               VALUES ($1, $2, $3, $4) RETURNING id;`  
  psql.query(query, newArtistRel[0], (err, result) => {
    if (err) {
      callback(err, null);  
    } else {
      var promiseArr = [];
      for (var i = 0; i < newArtistRel[1].length; i ++) {
        promiseArr.push(linkPromise(newArtistRel[1][i], result.rows[0].id))
      }
      Promise.all(promiseArr).then(value => callback(null, value));
    }
  })
}

//is this bad form???
// const postNewLink = (newArtistRel, callback) => {
//   let query = `INSERT INTO artists (ArtistName, Followers, PhotoLink, TrackName)
//                VALUES ($1, $2, $3, $4) RETURNING id;`  
//   psql.query(query, newArtistRel[0], (err, result) => {
//     if (err) {
//       callback(err, null);  
//     } else {
//       console.log('RETURNING id', result.rows[0].id);
//       for (var i = 0; i < newArtistRel[1].length; i ++) {

//         let jointQuery = `INSERT INTO artistRelations VALUES (
//                          ${newArtistRel[1][i]}, ${result.rows[0].id});`
//         psql.query(jointQuery, (err, result) => {
//           if (err) {
//             callback(err, null);
//           } else {
//             callback(null, result);
//           }
//         })
//       }
//     }
//   })
// }

const getRelArtists = (artistId, callback) => {
  let query = `SELECT artists.* FROM artistrelations 
               INNER JOIN artists ON artistrelations.relatedid = artists.id 
               WHERE artistrelations.artistid = ${artistId};`
  psql.query(query, (err, result) => {
    if (err) {
      console.log("error GET!")
      callback(err, null);
    } else {
      callback(null, result.rows);
    }
  })
}

const updateRelatedArtistInfo = (artistInfo, callback) => {
  let query = `UPDATE artists
               SET ${artistInfo[1][0]} = '${artistInfo[1][1]}'
               WHERE id = ${artistInfo[0][1]}`
               console.log(query);
  psql.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const removeRelatedArtist = (artistRel, callback) => {
  let query = `DELETE FROM artistrelations 
               WHERE artistrelations.artistid = ${artistRel[0]} 
               AND artistrelations.relatedid = ${artistRel[1]};`
  psql.query(query, (err, result) => {
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