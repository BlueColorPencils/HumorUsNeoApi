var app = require("../app");
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j','MEOW'))
var session = driver.session();

var User = function(user) {
  this.id = user;
};

//gonna have to change all of the Person to User!!!!

User.findUser = function(fbID, callback) {
  console.log("finnnnn user", fbID)

  session
  .run('MATCH (n:User {fbID: {fbID}}) USING INDEX n:User(name) RETURN n', {fbID: fbID})
  .then(function(result){
    // console.log("FIND USER", result.records[0]._fields[0].properties)
    let userInfo = result.records[0]._fields[0].properties;
    console.log("in find user .then")
    console.log(result.records[0]._fields[0].labels)
    callback(null, userInfo)
  })
  .catch(function(err){
    console.log("in find user errorrrr")
    callback(err, undefined)
  })

}

// this should ONLY happen AFTER fb Oauth IF user is NOT found.
// should ever happen ONCE!!!!!!!!!
User.createUser = function(fbID, name, birthday, age, photo, preferredLocationKM, preferredAgeMin, preferredAgeMax, lat, long, date, description, gender, preferredGender, callback) {

  // console.log("model", fbID, name, birthday, age)

  // creates a new user with properties of fbID,  name, birthday, age, photo, preferredLocationKM, preferredAgeMin, preferredAgeMax, lat, long, date, description.
  // also create a relationship to gender and preferredGender
  session
  .run('CREATE (n:User {fbID:{fbID}, name:{name}, birthday:{birthday}, age:{age}, photo:{photo}, preferredLocationKM:{preferredLocationKM}, preferredAgeMin:{preferredAgeMin}, preferredAgeMax:{preferredAgeMax}, lat:{lat}, long:{long}, dateJoined:{dateJoined}, dateLastLogin:{dateLastLogin}, description:{description}}), (n)-[m:ISGENDER]->(g:Gender {name: {gender} }), (n)-[o:WANTSGENDER]->(pg:Gender {name: {preferredGender} }) RETURN n', {fbID:fbID, name:name, birthday:birthday, age:age, photo:photo, preferredLocationKM:preferredLocationKM, preferredAgeMin:preferredAgeMin, preferredAgeMax:preferredAgeMax, lat:lat, long:long, dateJoined:date, dateLastLogin:date, description:description, gender:gender, preferredGender:preferredGender})

  .then(function(result){

    // console.log("RESULT duuuuude", result)
    // console.log("HELLO?", result);
    console.log("in the createuser .then")
    console.log(result.records[0]._fields[0].properties)
    console.log(result.records[0])
    let userInfos = result.records[0]._fields[0].properties;
    callback(null, userInfos)
  })
  .catch(function(err){
    console.log("in the createuser error")
    callback(err, undefined)
  })
}

//DEPRECATED MVP
// CREATES persons gender AND their preferred Gender
// future will have a loop that creates ALL gender relationships
// this is just the basic
User.createGenderRel = function(fbID, gender, preferredGender, callback) {
  // not quite sure what all I really want to return..
  console.log("ARE YOU IN GENDER?????", fbID, gender, preferredGender)
  session
  // USING INDEX pg:Gender(name).. I need to create all of these indexes first
  .run('MATCH (n:User {fbID: {fbID}}) CREATE (n)-[m:ISGENDER]->(g:Gender {name: {gender} }), (n)-[o:WANTSGENDER]->(pg:Gender {name: {preferredGender} }) RETURN n', {fbID: fbID, gender:gender, preferredGender: preferredGender})

  .then(function(result){
    console.log("in create Gender Rel", result)
    // console.log("2", result.records)
    // console.log("1", result.records[0]._fields[0].properties)
      let userInfo = result.records[0]._fields[0].properties
    callback(null, userInfo)
  })
  .catch(function(err){
    console.log("in create gender ERROR")
    callback(err, undefined)
    // console.log(err)
  })
}

// Finds all of a given node.
// Lets you check all users or all pictures, etc.
// Person, Picture, Gender
User.findNodes = function(node, callback) {
  console.log("NODE", node)
  var query = 'MATCH (n:'+node+') RETURN n'

  session
  .run(query)

  .then(function(result){
      console.log("RESULT", result)

    var nodesArr = [];
    result.records.forEach(function(record){
      nodeArr.push({
        id: record._fields[0].identity.low,
        name: record._fields[0].properties.name
      })
    })
    callback(null, nodesArr)
  })
  .catch(function(err){
    callback(err, undefined)
    console.log(err)
  })
}


User.findNewMatches = function(fbID, callback) {
  // console.log("NODE", node)
  // var query = 'MATCH (n:'+node+') RETURN n'

  //change PERSON BACK TO USER AND NAME TO FBID
  session
  .run('MATCH (m:Person {name: {fbID}}) OPTIONAL MATCH (n:Person) WHERE (m)-[:LIKES|:DISLIKES]->()<-[:LIKES|:DISLIKES]-(n)  RETURN n, m, ((size((m)-[:LIKES]->()<-[:LIKES]-(n)) +size((m)-[:DISLIKES]->()<-[:DISLIKES]-(n))) /(size((m)-[]->()<-[]-(n))*1.0)) as percentage ORDER BY (percentage) DESC LIMIT 5', {fbID:fbID})

  .then(function(result){
    if (result.records[0]._fields[0] == null) {
      var matchesArr = null
    } else {
      var matchesArr = [];

      result.records.forEach(function(record){
        console.log("keys", record.keys)
        console.log("fields", record._fields)
        console.log("fieldLookup", record._fields)

        matchesArr.push({
          // fbID: record._fields[0].identity.low,
          all: record,
          name: record._fields[0].properties.name,
          percentage: Math.round(record._fields[2]*100)
        })
      })
    }
    callback(null, matchesArr)
  })
  .catch(function(err){
    callback(err, undefined)
    console.log(err)
  })
}
// MATCH (m:User {fbID: {fbID}})
// OPTIONAL MATCH (n:User)
// WHERE (m)-[:LIKES|:DISLIKES]->()<-[:LIKES|:DISLIKES]-(n) AND NOT (n)<-[:MATCH]-(m)
// RETURN n, m, ((size((m)-[:LIKES]->()<-[:LIKES]-(n))+size((m)-[:DISLIKES]->()<-[:DISLIKES]-(n)))/(size((m)-[]->()<-[]-(n))*1.0))*100 as total
// ORDER BY (total) DESC LIMIT 5
//
//
//
// MATCH (m:Person {name: "Ann"})
// OPTIONAL MATCH (n:Person)
// WHERE (m)-[:LIKES|:DISLIKES]->()<-[:LIKES|:DISLIKES]-(n) AND NOT (n)<-[:MATCH]-(m)
// RETURN n, m, ((size((m)-[:LIKES]->()<-[:LIKES]-(n))+size((m)-[:DISLIKES]->()<-[:DISLIKES]-(n)))/(size((m)-[]->()<-[]-(n))*1.0))*100 as total
// ORDER BY (total) DESC



User.findExistingMatches = function(node, callback) {
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
