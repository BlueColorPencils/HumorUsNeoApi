var app = require("../app");
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j','MEOW'))
var session = driver.session();

var User = function(user) {
  this.id = user;
};

//gonna have to change all of the Person to User!!!!

User.findUser = function(name, callback) {
  session
  .run('MATCH (n:User {name: {name}}) RETURN n', {name: name})

  .then(function(result){
    var userArr = [];
      userArr.push({
        id: record._fields[0].identity.low,
        name: record._fields[0].properties.name
      })
    callback(null, personArr)
  })
  .catch(function(err){
    callback(err, undefined)
  })
}

// this should happen after fb Oauth if user is NOT found.
// should ever happen ONCE
User.createUser = function(fbID, name, birthday, age, photo, preferredLocationKM, preferredAgeMin, preferredAgeMax, lat, long, date, description, callback) {
  session
  .run('CREATE (n:User {fbID:{fbID}, name:{name}, birthday:{birthday}, age:{age}, photo:{photo}, preferredLocationKM:{preferredLocationKM}, preferredAgeMin:{preferredAgeMin}, preferredAgeMax:{preferredAgeMax}, lat:{lat}, long:{long}, dateJoined:{dateJoined}, dateLastLogin:{dateLastLogin}, description:{description}}) RETURN n', {fbID:fbID, name:name, birthday:birthday, age:age, photo:photo, preferredLocationKM:preferredLocationKM, preferredAgeMin:preferredAgeMin, preferredAgeMax:preferredAgeMax, lat:lat, long:long, dateJoined:date, dateLastLogin:date, description:description})

  .then(function(result){
    var userArr = [];
    // console.log(result)
    // result.records.forEach(function(record){
      userArr.push({
        id: record._fields[0].identity.low,
        name: record._fields[0].properties.name
      })
    //   console.log(record._fields[0].properties);
    //   console.log(record._fields[0].identity.low);
      // console.log(result);
    // })
    callback(null, result)
  })
  .catch(function(err){
    callback(err, undefined)
    console.log("ERROR??", err)
  })
}

// CREATES persons gender AND their preferred Gender
// future will have a loop that creates ALL gender relationships
// this is just the basic
User.createGenderRel = function(id, gender, preferredGender, date, callback) {
  // not quite sure what all I really want to return..
  session
  .run('MATCH (n:User {fbID: {fbID}}) USING INDEX n:User(fbID) MATCH (g:Gender {name: {gender}}) USING INDEX g:Gender(name) MATCH (pg:Gender {name: {preferredGender}}) USING INDEX pg:Gender(name) CREATE (n)-[m:ISGENDER {date: {date}}]->(g), (n)-[o:LOOKINGGENDER {date: {date}}]->(pg) RETURN n', {fbID: fbID, gender:gender, preferredGender: preferredGender, date:date})

  .then(function(result){
      // console.log("RESULT", result)

    // var nodeArr = [];
    // result.records.forEach(function(record){
      // nodeArr.push({
        // id: record._fields[0].identity.low,
        const name = record._fields[0].properties.name
      // })
    // })
    callback(null, name)
  })
  .catch(function(err){
    callback(err, undefined)
    console.log(err)
  })
}

// Person, Picture, Gender
User.findNodes = function(node, callback) {
  console.log("NODE", node)
  var query = 'MATCH (n:'+node+') RETURN n'

  session
  .run(query)

  .then(function(result){
      console.log("RESULT", result)

    var nodeArr = [];
    result.records.forEach(function(record){
      nodeArr.push({
        id: record._fields[0].identity.low,
        name: record._fields[0].properties.name
      })
    })
    callback(null, nodeArr)
  })
  .catch(function(err){
    callback(err, undefined)
    console.log(err)
  })
}

//   .run("MATCH (n:Person {name: 'Ann' }) RETURN n")
//   // .run('MATCH (n:Person {name: {name} }) RETURN n', {name: name})
//
//   .then(function(result){
//     var userInfo = result.records
//       // console.log(record._fields[0].properties);
//       // console.log(record._fields[0].identity.low);
//       console.log(record._fields);
//       console.log("RESULTS????");
//       callback(null, userInfo)
//   })
//   .catch(function(err){
//     console.log("ERROR???")
//     console.log(err)
//     callback(err, undefined)
//   })
// }

//
// app.get('/', function(req,res) {
//   session
//   .run('MATCH (n:Person {name: "Ann"}), (p:Picture) WHERE NOT (n)-[]->(p) RETURN n, p')
//     // .run('MATCH (n:Person {name: "Ann"})-[:LIKES]->(w) RETURN n, w')
//
//   .then(function(result){
//     var userArr = [];
//     result.records.forEach(function(record){
//       userArr.push({
//         id: record._fields[0].identity.low,
//         name: record._fields[0].properties
//       })
//       // console.log(record._fields[0].properties);
//       // console.log(record._fields[0].identity.low);
//       console.log(record._fields);
//     })
//     res.render('index');
//   })
//   .catch(function(err){
//     console.log(err)
//   })
// })

// app.post('/user/add', function(req, res) {
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
// User.all = function(callback) {
//   db.query("select * from users", function(error, users) {
//     if(error || !users || users === 0) {
//       callback(error || new Error("Could not retrieve users"), undefined);
//     } else {
//       var allUsers = users.map(function(user) {
//         return new User(user);
//       });
//       // console.log(allUsers)
//       callback(null, allUsers)
//     };
//   });
// };
//
// User.sort = function(query, n, p, callback) {
//   db.users.find({}, {
//     order: query,
//     limit: n,
//     offset: p
//   }, function(error, users) {
//     console.log(users)
//     if(error || !users) {
//       callback(error || new Error("Could not retrieve user"), undefined);
//     } else {
//       var allUsers = users.map(function(user) {
//         return new User(user);
//       });
//       callback(null, allUsers)
//     };
//   });
// };

module.exports = User;
