var app = require("../app");
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j','MEOW'))
var session = driver.session();

var Pic = function(pic) {
  this.id = pic;
};

Pic.findUnseenPictures = function (fbID, callback) {
  session
  .run('MATCH (n:User {fbID:{fbID}}) OPTIONAL MATCH (p:Picture) WHERE NOT (n)-[]->(p) RETURN p LIMIT 1', {fbID: fbID})
  .then(function(result){
    callback(null, result.records[0]._fields[0].properties)
  })
  .catch(function(err){
    console.log("ERROR", err)
    callback(err, undefined)
  })
}

Pic.createPictureNode = function(imgurID, title, name, description, link, dateAdded, type, callback) {
  session
  .run('CREATE (p:Picture { imgurID:{imgurID}, title:{title}, name:{name}, description:{description}, link:{link}, dateAdded:{dateAdded}, type:{type}}) RETURN p', {imgurID:imgurID, title:title, name:name, description:description, link:link, dateAdded:dateAdded, type:type})
  .then(function(result){
    callback(null, result.records[0]._fields[0].properties)
  })
  .catch(function(err){
    console.log("IN the create picture node error", err)
    callback(err, undefined)
  })
}


//currently lets you add multiple relationships to a photo
// will fix after mvp
Pic.createPictureRel =  function(fbID, imgurID, relationship, dateAdded, callback) {
  let query = "MATCH (n:User {fbID:'"+fbID+"'}) USING INDEX n:User(fbID) OPTIONAL MATCH (p:Picture {imgurID:'"+imgurID+"'}) USING INDEX p:Picture(imgurID) MERGE (n)-[l:"+relationship+"]->(p) ON CREATE SET l.dateAdded = "+dateAdded+" RETURN p, n"
  session
  .run(query)
  .then(function(result){
    console.log("create pic result", result)
    // callback(null, result.records[0]._fields[0].properties)
    if (result.records.length == 0) {
      console.log("record length is 0")
      callback("Check fbID or ImgurID. Can't find it in db", undefined)
    } else {
      callback(null, result.records[0]._fields[0].properties)
    }
  })
  .catch(function(err){
    console.log("IN the create picture error", err)
    callback(err, undefined)
  })
}


module.exports = Pic;
