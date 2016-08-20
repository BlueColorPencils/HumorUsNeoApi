var app = require("../app");
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j','MEOW'))
var session = driver.session();

var Pic = function(pic) {
  this.id = pic;
};




Pic.unseenByPerson = function (name, callback) {
  session
  .run('MATCH (n:Person {name: {name}}), (p:Picture) WHERE NOT (n)-[]->(p) RETURN n, p LIMIT 1', {name: name})
    // .run('MATCH (n:Person {name: "Ann"})-[:LIKES]->(w) RETURN n, w')

  .then(function(result){
    var pictureArr = [];
    result.records.forEach(function(record){
      pictureArr.push({
        id: record._fields[0].identity.low,
        name: record._fields[0].properties
      })
      // console.log(record._fields[0].properties);
      // console.log(record._fields[0].identity.low);
      console.log(record._fields);
    })
    callback(null, pictureArr)
  })
  .catch(function(err){
    console.log(err)
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



Pic.all = function(callback) {
  db.query("select * from pics", function(error, pics) {
    if(error || !pics || pics === 0) {
      callback(error || new Error("Could not retrieve pics"), undefined);
    } else {
      var allPics = pics.map(function(pic) {
        return new Pic(pic);
      });
      // console.log(allPics)
      callback(null, allPics)
    };
  });
};

// Pic.sort = function(query, n, p, callback) {
//   db.pics.find({}, {
//     order: query,
//     limit: n,
//     offset: p
//   }, function(error, pics) {
//     console.log(pics)
//     if(error || !pics) {
//       callback(error || new Error("Could not retrieve pic"), undefined);
//     } else {
//       var allPics = pics.map(function(pic) {
//         return new Pic(pic);
//       });
//       callback(null, allPics)
//     };
//   });
// };

module.exports = Pic;
