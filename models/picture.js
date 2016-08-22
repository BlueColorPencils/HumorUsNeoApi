var app = require("../app");
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j','MEOW'))
var session = driver.session();

var Pic = function(pic) {
  this.id = pic;
};


Pic.findUnseenPictures = function (fbID, callback) {
  session
  .run('MATCH (n:User {fbID:{fbID}}) OPTIONAL MATCH (p:Picture) WHERE NOT (n)-[]->(p) RETURN n, p LIMIT 1', {fbID: fbID})

    // .run('MATCH (n:Person {name: "Ann"})-[:LIKES]->(w) RETURN n, w')

  .then(function(result){
    // console.log("RESULT!!!!!", result)
    // console.log("records!!!!", result.records)
    // if (result.records = [])
    // var pictureArr = [];
    // result.records.forEach(function(record){
      // pictureArr.push({
      //   id: record._fields[0].identity.low,
      //   name: record._fields[0].properties
      // })
      // console.log(record._fields[0].properties);
      // console.log(record._fields[0].identity.low);
      // console.log(record._fields);
    // })
    callback(null, result.records._fields[0].properties)
  })
  .catch(function(err){
    console.log("ERROR", err)
    callback(err, undefined)
  })
}

// app.post('/person/add', function(req, res) {
//   var name = req.body.whatever
//
//   session
//     .run('CREATE(n:Person {name: {nameParam}, **THE REST OF PERSON SCHEMA}) RETURN whatever', {nameParam:name, otherParam:varname})
//     .then(function(result){
//       **probs send back json
//       session.close();
//     })
//     .catch(function(err) {
//       console.log(err)
//     })
// })
//

//
//
// Pic.all = function(callback) {
//   db.query("select * from pics", function(error, pics) {
//     if(error || !pics || pics === 0) {
//       callback(error || new Error("Could not retrieve pics"), undefined);
//     } else {
//       var allPics = pics.map(function(pic) {
//         return new Pic(pic);
//       });
//       // console.log(allPics)
//       callback(null, allPics)
//     };
//   });
// };

Pic.createPictureNode =  function(imgurID, title, name, description, link, dateAdded, type, callback) {

  console.log("WTF", imgurID, title, name, description, link, dateAdded, type)
  session
  .run('CREATE (p:Picture { imgurID:{imgurID}, title:{title}, name:{name}, description:{description}, link:{link}, dateAdded:{dateAdded}, type:{type}}) RETURN p', {imgurID:imgurID, title:title, name:name, description:description, link:link, dateAdded:dateAdded, type:type})

  .then(function(result){
    callback(null, result.records[0]._fields[0].properties)
  })
  .catch(function(err){
    console.log("IN the create picture error", err)
    callback(err, undefined)
  })
}


module.exports = Pic;
