var User = require("../models/user");
var async = require("async");


var UserController = {
  findUser: function(req, res, next) {
    console.log("params", req.params.fbID.toString())
    User.findUser(req.params.fbID.toString(), function(error, user) {
        if(error) {
        var err = new Error("Error retrieving user: " + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(user)
      }
    });
  },

  createUser: function(req, res, next) {
    const info = req.information
    const date = Date.now() // in seconds

    User.createUser(info.fbID, info.name, info.birthday, info.age, info.photo, info.preferredLocationKM, info.preferredAgeMin, info.preferredAgeMax, info.lat, info.long, date, info.description, info.gender, info.preferredGender, function(error, users) {
      // if there's an error => wrong JSON body
      if(error) {
        var err = new Error("Error creating user and gender relationships, check JSON body format: " + error.message);
        err.status = 500;
        next(err);
      }
      else {
        res.json(users)
      }
    })
  },

  findOrCreateUser: function(req, res, next) {
    // send in all of the user info in JSON body.
    // NEED TO FIGURE OUT ERROR RESPONSE IF SOMETHING GOES AWRY
    var info = res.req.body
    info.fbID = info.fbID.toString()
    // FIND if user exists

    User.findUser(info.fbID, function(error, user) {
      // CREATE the user if error finding a user (user does NOT exist)
      if(error) {
        var gender = info.gender.toLowerCase()
        if (!info.age) {info.age = 18}
        if (!info.photo) {info.photo = 'http://i.imgur.com/gvK46e9.jpg'}
        if (!info.birthday) {info.birthday = 0}
        if (!info.preferredLocationKM) {info.preferredLocationKM = 0}
        if (!info.preferredAgeMin) {info.preferredAgeMin = info.age}
        if (!info.preferredAgeMax) {info.preferredAgeMax = 60}
        if (!info.lat) {info.lat = 0}
        if (!info.long) {info.long = 0}
        if (!info.description) {info.description = "Hi, I am "+info.name+"!"}
        if (!info.gender || ((gender !== 'male') && (gender !== 'female')) ) {
          info.gender = 'none'
        }
        if (!info.preferredGender) {
          info.preferredGender = 'friends'
        } else {
          info.preferredGender = info.preferredGender.toLowerCase()
        }
        req.information = info
        next()

      } else {
        res.json(user)
      }
    });
  },

  createNewMatches: function(req, res, next) {
    const matchesArr = req.query
    const date = Date.now() // in seconds

    // I love you async package. <3
    async.each(matchesArr, function(info, callback) {
      User.createNewMatches(req.fbID, info, date, function(error, match) {
        // error with my query
        if(error) {
          let err = new Error("Error creating a new match. Tell Cristal to check her Cypher query." + error.message);
          err.status = 500;
          // next(err)
          return callback(err)
        }
          callback()
        })
      }, function(error) {
        if (error) {
          err.status = 500;
        } else {
          res.json({newmatches: matchesArr.length})
        }
      }
    )
  },


  // THIS SHOULD BE TRIGGERED AFTER USER HAS SEEN batches of 50 pictures

  findNewMatches: function(req, res, next) {
    const fbID = req.params.fbID.toString()

    User.findNewMatches(fbID, function(error, matches) {
      // There are NO new matches...
      if(error || matches === null) {
        if (error == "TypeError: Cannot read property '_fields' of undefined") {
          let err = new Error("Incorrect fbID");
          err.status = 500;
          next(err);
        } else {
          let err = new Error("No new matches");
          err.status = 500;
          next(err);
        }
      } else {
        req.query = matches
        req.fbID = fbID
        next()
      }
    });
  },

  findExistingMatches: function(req, res, next) {
    User.findExistingMatches(req.params.fbID, function(error, matches) {
      // There are NO new matches OR an error
      if(error || matches.length === 0) {
        if (error.message == "Cannot read property 'properties' of null") {
          var err = new Error("No matches yet 😭 Keep swiping!")
        }
        else if (error.message == "Cannot read property 'message' of null") {
          var err = new Error("Wrong fbID sent")
        }
        err.status = 500;
        next(err);
      } else {
        res.json(matches)
      }
    });
  },

  findNodes: function(req, res, next) {
    User.findNodes(req.params.node.toString(), function(error, user) {
      if(error) {
        var err = new Error("Error retrieving nodes: " + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(user)
      }
    });
  }

  // DEPRECATED STUFF BELOW for MVP will be used when user settings is ENABLED.
  // createGenderRel: function(req, res, next) {
  //   // req.params.id get it from url params
  //   console.log("PARAMS", req.params.id.toString())
  //   User.createGenderRel(req.params.id.toString(), function(error, user) {
  //       if(error) {
  //       var err = new Error("Error retrieving user: " + error.message);
  //       err.status = 500;
  //       next(err);
  //     } else {
  //       res.json(user)
  //     }
  //   });
  // },

  // editUser: function(req, res, next) {
  //   // res.body.alllll sorts of info from user
  //   // info.gender is an array []
  //   // info.preferredGender is an array []
  //
  //   res.req.body
  //
  //   // nodes: User, Picture, Gender
  //
  //   console.log("PARAMS", req.params.node.toString())
  //   // console.log("BODY????", res.req.body)
  //   User.findNodes(req.params.node.toString(), function(error, user) {
  //     if(error) {
  //       var err = new Error("Error retrieving nodes: " + error.message);
  //       err.status = 500;
  //       next(err);
  //     } else {
  //       res.json(user)
  //     }
  //   });
  // }

}

module.exports = UserController;
