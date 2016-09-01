var User = require("../models/user");
var async = require("async");


var UserController = {

  findUser: function(req, res, next) {
    // '/user/:fbID/'
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

  findOrCreateUser: function(req, res, next) {
    // '/user/' POST (1 of 2)
    var info = res.req.body
    console.log(info)
    info.fbID = info.fbID.toString()

    // FIND if user exists
    User.findUser(info.fbID, function(error, user) {
      // CREATE the user if error finding a user (user does NOT exist)
      console.log(error, user);
      if(error) {
        if (!info.age) {info.age = 18}
        if (!info.photo) {info.photo = 'http://i.imgur.com/gvK46e9.jpg'}
        if (!info.birthday) {info.birthday = 0}
        if (!info.preferredAgeMin) {info.preferredAgeMin = info.age}
        if (!info.preferredAgeMax) {info.preferredAgeMax = 60}
        if (!info.lat) {info.lat = 0}
        if (!info.long) {info.long = 0}
        if (!info.education) {info.education = 'none'}
        // if (!info.description) {info.description}

        if (info.gender) {
          info.gender.forEach
          info.gender.push('Friends')
        } else {
          info.gender = ['Friends']
        }

        if (info.preferredGender) {
          info.preferredGender.push('Friends')
        } else {
          info.preferredGender = ['Friends']
        }

        info.preferredLocationMI = 13000;
        req.information = info
        next()

      } else {
        res.json(user)
      }
    });
  },

  createUser: function(req, res, next) {
    // '/user/' POST (2 of 2)
    const info = req.information
    const date = Date.now().toString() // in seconds

    User.createUser(info.fbID, info.name, info.birthday, info.age, info.photo, info.preferredLocationMI, info.preferredAgeMin, info.preferredAgeMax, info.lat, info.long, date, info.description, info.education, info.gender, info.preferredGender, function(error, users) {
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

    updateUser: function(req, res, next) {
      const info = res.req.body
      console.log("info", info)

      if (!info.birthday) {info.birthday = 0}

      if (!info.description) {info.description = ''}

      if (!info.gender) {
        info.gender = ['Friends']
      } else {
        var found = info.gender.indexOf(" ");
        while (found !== -1) {
          info.gender.splice(found, 1);
          found = info.gender.indexOf(" ");
        }
      }

      if (info.preferredGender.indexOf("Friends") !== -1 && info.gender.indexOf("Friends") === -1) {
        info.gender.push('Friends')
      }

      if (info.gender.indexOf("Friends") !== -1 && info.preferredGender.indexOf("Friends") === -1) {
        info.preferredGender.push('Friends')
      }

      if (!info.preferredGender) {
        info.preferredGender = ['Friends']
      } else {
        var found = info.preferredGender.indexOf(" ");
        while (found !== -1) {
          info.preferredGender.splice(found, 1);
          found = info.preferredGender.indexOf(" ");
        }
      }

      if(info.preferredLocationMI === 0) {
        info.preferredLocationMI = 13000
      }

      User.updateUser(info.fbID.toString(), info.birthday, info.preferredLocationMI, info.preferredAgeMin, info.preferredAgeMax, info.description, info.gender, info.preferredGender, function(error, users) {
        // if there's an error => wrong JSON body
        if(error) {
          console.log(error)
          var err = new Error("Error creating user and gender relationships, check JSON body format: " + error.message);
          err.status = 500;
          next(err);
        }
        else {
          console.log("success", users)
          res.json(users)
        }
      })
    },

  // THIS SHOULD BE TRIGGERED AFTER USER HAS SEEN batches of 50 pictures
  findNewMatches: function(req, res, next) {
  // '/user/:fbID/newmatches' (1 of 2)
    var fbID = req.fbID
    var count = req.picturecount
        console.log("POPCORN", count, fbID)
    if (count % 50 == 0) {

      User.findNewMatches(fbID, function(error, matches) {
        // There are NO new matches...
        if(error || matches === null) {
          console.log("null?", error)
          // if (error == "TypeError: Cannot read property '_fields' of undefined") {
            var err = new Error("Incorrect fbID");
            err.status = 500;
            next(err);

          // } else {
          //   var err = new Error("No new matches");
          //   err.status = 500;
          //   next(err);
          // }

        } else {
          console.log("elseeee", matches)
          req.query = matches
          req.fbID = fbID
          next()
        }
      });
    } else {
      console.log("hither")
      res.json("No new matches")
      // req.query = matches
      // req.fbID = fbID
      // next()
    }

  },

  createNewMatches: function(req, res, next) {
  // '/user/:fbID/newmatches' (2 of 2)
    const matchesArr = req.query
    console.log("MATCHES", matchesArr)
    const date = Date.now().toString() // in seconds

    // I love you async package. <3
    async.each(matchesArr, function(info, callback) {
      User.createNewMatches(req.fbID, info, date, function(error, match) {
        // error with my query
        if(error) {
          var err = new Error("Error creating a new match. Tell Cristal to check her Cypher query." + error.message);
          err.status = 500;
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

  findExistingMatches: function(req, res, next) {
  // '/user/:fbID/matches'
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
  // '/find/:node'
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

}

module.exports = UserController;
