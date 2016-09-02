var app = require("../app");
var neo4j = require('neo4j-driver').v1;
var config = require("../config");

var driver = neo4j.driver(config.neo4j.url, neo4j.auth.basic(config.neo4j.username, config.neo4j.password))
var session = driver.session();

var Pic = function(pic) {
  this.id = pic;
};

Pic.findUnseenPictures = function (fbID, callback) {
  console.log("HERE IS THE FBID", fbID)
  session
  .run('MATCH (n:User {fbID:{fbID}}) USING INDEX n:User(fbID) OPTIONAL MATCH (p:Picture) WHERE NOT (n)-[]->(p) RETURN p LIMIT 10', {fbID:fbID})
  .then(function(result){
    console.log("IN RESULTS?")
    // var x = result.records.length
    var y = Math.floor(Math.random() * (10-1))
    // var pictureArr = []
    // console.log("find unseen pictures", result.records)
    var pictureArr = result.records[y]._fields[0].properties
    console.log("picture arr", pictureArr)
    callback(null, pictureArr)
  })
  .catch(function(err){
    callback(err, undefined)
  })
}

Pic.findUnseenPicturesCount = function (fbID, callback) {
  session
  .run('MATCH (n:User {fbID:{fbID}}) USING INDEX n:User(fbID) OPTIONAL MATCH (p:Picture) WHERE NOT (n)-[]->(p) RETURN COUNT(*)', {fbID: fbID})
  .then(function(result){
    var pictureCount = result.records[0]._fields[0].low
    // var x = result.records.length
    // var y = Math.floor(Math.random() * (x-1))
    // var pictureArr = result.records[y]._fields[0].properties
    // console.log("find unseen pictures", result.records._fields[0]._fields)
    // pictureArr.push(x, result.records[y]._fields[0].properties)
    console.log("findunseen pic count", result.records[0]._fields[0].low)
    callback(null, pictureCount)
  })
  .catch(function(err){
    callback(err, undefined)
  })
}

Pic.findSeenPicturesCount = function (fbID, callback) {
  session
  .run('PROFILE MATCH (n:User {fbID:{fbID}}) USING INDEX n:User(fbID) RETURN n.name, size((n)-[:LIKES|:DISLIKES]->()) as count', {fbID: fbID})
  .then(function(result){
    callback(null, result.records[0]._fields[1].low)
  })
  .catch(function(err){
    callback(err, undefined)
  })
}

Pic.createPictureNode = function(imgurID, title, link, dateAdded, type, callback) {
  session
  .run('MERGE (p:Picture {imgurID:{imgurID}, title:{title}, link:{link}, type:{type}}) ON CREATE SET p.dateAdded = timestamp() ON MATCH SET p.lastSeen = timestamp() RETURN p', {imgurID:imgurID, title:title, link:link, dateAdded:dateAdded, type:type})
  // .run('MERGE (p:Picture {imgurID:{imgurID}, title:{title}, link:{link}, dateAdded:{dateAdded}, type:{type}}) ON CREATE SET p.dateAdded = timestamp() ON MATCH SET p.dateAdded = timestamp() RETURN p', {imgurID:imgurID, title:title, link:link, dateAdded:dateAdded, type:type})
  .then(function(result){
    console.log("created pic", result.records[0]._fields[0].properties)
    callback(null, result.records[0]._fields[0].properties)
  })
  .catch(function(err){
    console.log("failed", err)
    callback(err, undefined)
  })
}


//currently vars you add multiple relationships to a photo
// will fix after mvp
Pic.createPictureRel =  function(fbID, imgurID, relationship, dateAdded, callback) {
  var query = "MATCH (n:User {fbID:'"+fbID+"'}) USING INDEX n:User(fbID) OPTIONAL MATCH (p:Picture {imgurID:'"+imgurID+"'}) USING INDEX p:Picture(imgurID) MERGE (n)-[l:"+relationship+"]->(p) ON CREATE SET l.dateAdded = "+dateAdded+" RETURN p, n"
  session
  .run(query)
  .then(function(result){
    if (result.records.length == 0) {
      console.log("record length is 0")
      callback("Check fbID or ImgurID. Can't find it in db", undefined)
    } else {
      callback(null, result.records[0]._fields[0].properties)
    }
  })
  .catch(function(err){
    callback(err, undefined)
  })
}


module.exports = Pic;
