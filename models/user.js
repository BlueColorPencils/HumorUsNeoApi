var app = require("../app");
var neo4j = require('neo4j-driver').v1;
var config = require("../config");

var driver = neo4j.driver(config.neo4j.url, neo4j.auth.basic(config.neo4j.username, config.neo4j.password))
var session = driver.session();

var User = function(user) {
  this.id = user;
};

User.findUser = function(fbID, callback) {
  session
  .run('MATCH (n:User {fbID: {fbID}}) RETURN n', {fbID: fbID})
  .then(function(result){
    if (result.records.length === 0 ){
      callback("not found", undefined)
    } else {
    // console.log(result)
      var userInfo = result.records[0]._fields[0].properties;
      var newgenderArr = userInfo.gender
      var tempArr = []

      newgenderArr.forEach( (gender)=> {
        tempArr.push(" ", gender)
      })

      userInfo.gender = tempArr

      var newgenderPrefArr = userInfo.preferredGender
      var tempArrTwo = []

      newgenderPrefArr.forEach( (gender)=> {
        tempArrTwo.push(" ", gender)
      })

      userInfo.preferredGender = tempArrTwo
      console.log(userInfo)

      callback(null, userInfo)
    }
  })
  .catch(function(err){
    callback(err, undefined)
  })
}


// this should ONLY happen AFTER fb Oauth IF user is NOT found.
// should ever happen ONCE!!!!!!!!!
User.createUser = function(fbID, name, birthday, age, photo, preferredLocationMI, preferredAgeMin, preferredAgeMax, lat, long, date, description, education, gender, preferredGender, callback) {

  // CREATES a new user with properties
  // CREATES a relationship to gender and preferredGender
  session
  .run('CREATE (n:User {fbID:{fbID}, name:{name}, birthday:{birthday}, age:{age}, photo:{photo}, preferredLocationMI:{preferredLocationMI}, preferredAgeMin:{preferredAgeMin}, preferredAgeMax:{preferredAgeMax}, lat:{lat}, long:{long}, dateJoined:{dateJoined}, dateLastLogin:{dateLastLogin}, description:{description}, education:{education}, gender:{gender}, preferredGender:{preferredGender} }) RETURN n', {fbID:fbID, name:name, birthday:birthday, age:age, photo:photo, preferredLocationMI:preferredLocationMI, preferredAgeMin:preferredAgeMin, preferredAgeMax:preferredAgeMax, lat:lat, long:long, dateJoined:date, dateLastLogin:date, description:description, education:education, gender:gender, preferredGender:preferredGender})

  .then(function(result){
    var userInfos = result.records[0]._fields[0].properties;
    callback(null, userInfos)
  })
  .catch(function(err){
    callback(err, undefined)
  })
}

User.updateUser = function(fbID, birthday, preferredLocationMI, preferredAgeMin, preferredAgeMax, description, gender, preferredGender, callback) {
  console.log("UPDATEEE", fbID, birthday, preferredLocationMI, preferredAgeMin, preferredAgeMax, description, gender, preferredGender)
  session
  .run('MATCH (n:User {fbID: {fbID}}) SET n.birthday={birthday}, n.preferredLocationMI={preferredLocationMI}, n.preferredAgeMin={preferredAgeMin}, n.preferredAgeMax={preferredAgeMax}, n.description={description}, n.gender={gender}, n.preferredGender={preferredGender} RETURN n', {fbID:fbID, birthday:birthday, preferredLocationMI:preferredLocationMI, preferredAgeMin:preferredAgeMin, preferredAgeMax:preferredAgeMax, description:description, gender:gender, preferredGender:preferredGender})
  .then(function(result){
    console.log("result", result)
    var userInfos = result.records[0]._fields[0].properties;
    callback(null, userInfos)
  })
  .catch(function(err){
    callback(err, undefined)
  })
}




// finds 5 new matches after user likes a batch of 50 photos
User.findNewMatches = function(fbID, callback) {
  console.log("in find new matches", fbID)
  session
  .run('MATCH (m:User {fbID: {fbID}}) USING INDEX m:User(fbID) OPTIONAL MATCH (n:User) WITH m,n,sum(size((m)-[:LIKES]->()<-[:LIKES]-(n))) as totes WHERE totes > 25 WITH m, n, totes, SUM(2*6371*asin(sqrt(haversin(radians(m.lat - n.lat))+cos(radians(m.lat))* cos(radians(n.lat))* haversin(radians(m.long - n.long)))))*0.621371 AS distance WHERE distance < m.preferredLocationMI AND ANY(gender IN n.gender WHERE gender IN m.preferredgender) AND NOT (m)-[:MATCHES]->(n) RETURN n, ((size((m)-[:LIKES]->()<-[:LIKES]-(n)) +size((m)-[:DISLIKES]->()<-[:DISLIKES]-(n))) /(size((m)-[:LIKES|:DISLIKES]->()<-[:LIKES|:DISLIKES]-(n))*1.0))*100 as percentage ORDER BY (percentage) DESC LIMIT 5', {fbID:fbID})
  // .run('MATCH (m:User {fbID: {fbID}}) USING INDEX m:User(fbID) OPTIONAL MATCH (n:User) WHERE ANY(gender IN n.gender WHERE gender IN m.preferredgender) AND NOT (m)-[:MATCHES]->(n) WITH m,n,sum(size((m)-[:LIKES]->()<-[:LIKES]-(n))) as totes WHERE totes > 25 WITH m, n,  SUM(2*6371*asin(sqrt(haversin(radians(n.lat - l.lat))+cos(radians(n.lat))* cos(radians(l.lat))* haversin(radians(n.long - l.long)))))*0.621371 AS distance  WHERE distance < 50 RETURN n, ((size((m)-[:LIKES]->()<-[:LIKES]-(n)) +size((m)-[:DISLIKES]->()<-[:DISLIKES]-(n))) /(size((m)-[:LIKES|:DISLIKES]->()<-[:LIKES|:DISLIKES]-(n))*1.0))*100 as percentage ORDER BY (percentage) DESC LIMIT 5', {fbID:fbID})

  .then(function(result){
    console.log("matches", result.records.length)
    if (result.records.length == null) {
      var matchesArr = null
      var err = "No new matches"
    } else {
      var matchesArr = [];
      result.records.forEach(function(record){
        console.log("fields", record._fields[0].properties.fbID)
        matchesArr.push({
          name: record._fields[0].properties.name,
          fbID: record._fields[0].properties.fbID,
          percentage: Math.round(record._fields[2]*100),
        })
      })
      const err = null
      console.log("huh?", matchesArr)
      // matchesArr.unshift(matchesArr.length)
    }
    callback(undefined, matchesArr)
  })
  .catch(function(err){
    console.log("has error?", err)
    callback(err, undefined)
  })
}

User.createNewMatches = function(fbID, matchObj, dateAdded, callback) {
  session
  .run('MATCH (n:User {fbID: {fbID}}) USING INDEX n:User(fbID) OPTIONAL MATCH (m:User {fbID: {fbID2}}) USING INDEX m:User(fbID) MERGE (n)-[:MATCHES {percentage:{percentage}, dateAdded:{dateAdded}, show:1}]->(m) RETURN n, m', {fbID:fbID, fbID2:matchObj.fbID, percentage:matchObj.percentage, dateAdded:dateAdded})
  .then(function(result){
    callback(null, undefined)
  })
  .catch(function(err){
    callback(err, undefined)
  })
}

User.findExistingMatches = function(fbID, callback) {
  session
  // .run('MATCH (n:User {fbID: {fbID}}) USING INDEX n:User(fbID) OPTIONAL MATCH (n)-[l:MATCHES]->(p) RETURN p, l', {fbID:fbID})
  .run('MATCH (m:User {fbID: {fbID}}) USING INDEX m:User(fbID) OPTIONAL MATCH (m)-[l:MATCHES]->(n) WITH n, l, m, sum(size((m)-[:LIKES]->()<-[:LIKES]-(n))) as likes, sum(size((m)-[:DISLIKES]->()<-[:DISLIKES]-(n))) as dislikes, sum(size((m)-[:LIKES|:DISLIKES]->()<-[:LIKES|:DISLIKES]-(n))) as total      SET l.percentage = ((likes+dislikes)/(total*1.0))*100 RETURN n, l, total ORDER BY (l.percentage) DESC', {fbID:fbID})
  .then(function(result){
    var matchesArr = [];
    result.records.forEach(function(record){
      console.log(record)
      matchesArr.push({
        name: record._fields[0].properties.name,
        age: record._fields[0].properties.age,
        fbID: record._fields[0].properties.fbID,
        photo: record._fields[0].properties.photo,
        dateLastLogin: record._fields[0].properties.dateLastLogin,
        percentage: Math.round(record._fields[1].properties.percentage),
        description: record._fields[0].properties.description
      })
    })
    callback(null, matchesArr)
  })
  .catch(function(err){
    callback(err, undefined)
  })
}


// Finds all of a given node. ex: User, Picture, Gender
User.findNodes = function(node, callback) {
  var query = 'MATCH (n:'+node+') RETURN n'
  session
  .run(query)
  .then(function(result){
    var nodesArr = [];
    result.records.forEach(function(record){
      nodesArr.push(record._fields[0].properties)
    })
    callback(null, nodesArr)
  })
  .catch(function(err){
    callback(err, undefined)
  })
}

//DEPRECATED MVP
// CREATES persons gender AND their preferred Gender
// future will have a loop that creates ALL gender relationships
// this is just the basic
// User.createGenderRel = function(fbID, gender, preferredGender, callback) {
//   // not quite sure what all I really want to return..
//   console.log("ARE YOU IN GENDER?????", fbID, gender, preferredGender)
//   session
//   // USING INDEX pg:Gender(name).. I need to create all of these indexes first
//   .run('MATCH (n:User {fbID: {fbID}}) CREATE (n)-[m:ISGENDER]->(g:Gender {name: {gender} }), (n)-[o:WANTSGENDER]->(pg:Gender {name: {preferredGender} }) RETURN n', {fbID: fbID, gender:gender, preferredGender: preferredGender})
//
//   .then(function(result){
//     console.log("in create Gender Rel", result)
//     // console.log("2", result.records)
//     // console.log("1", result.records[0]._fields[0].properties)
//       var userInfo = result.records[0]._fields[0].properties
//     callback(null, userInfo)
//   })
//   .catch(function(err){
//     console.log("in create gender ERROR")
//     callback(err, undefined)
//     // console.log(err)
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
