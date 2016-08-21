var User = require("../models/user");

var UserController = {
  findUser: function(req, res, next) {
    // send in all of the user info.. it's just a JSON body so yolo.
    // console.log("before?", res.req.body)
    var info = res.req.body
    var fbID = info.fbID.toString()

    // req.params.id get it from url params
    // console.log("PARAMS", req.params.id.toString())

    // FIND if user exists
    User.findUser(fbID, function(error, user) {

      // CREATE the user if error finding a user (user does NOT exist)
      console.log("!!!!!!! after find user", error)
      console.log("!!!!!!! after find user", user)
      if(error) {
        console.log("in find user if (error) ")
        if (!info.age) {info.age = 18}
        if (!info.photo) {info.photo = 'http://i.imgur.com/gvK46e9.jpg'}
        if (!info.birthday) {info.birthday = 0}
        if (!info.preferredLocationKM) {info.preferredLocationKM = 0}
        if (!info.preferredAgeMin) {info.preferredAgeMin = 18}
        if (!info.preferredAgeMax) {info.preferredAgeMax = 90}
        if (!info.lat) {info.lat = 0}
        if (!info.long) {info.long = 0}
        if (!info.description) {info.description = "Hi, I am "+info.name+"!"}
        const date = Date()

        if (!info.gender) {
          var gender = 'none'
        } else {
          var gender = info.gender.toLowerCase()
          if (gender !== 'male' || gender !== 'female') {
            gender = 'none'
          }
        }

        if (!info.preferredGender) {
          var preferredGender = 'friends'
        } else {
          var preferredGender = info.preferredGender.toLowerCase()
        }

        console.log("hell?", fbID, info.name, info.birthday, info.age, info.photo, info.preferredLocationKM, info.preferredAgeMin, info.preferredAgeMax, info.lat, info.long, date, info.description, gender, preferredGender)
        // console.log("wha?", res.req.body)

        User.createUser(fbID, info.name, info.birthday, info.age, info.photo, info.preferredLocationKM, info.preferredAgeMin, info.preferredAgeMax, info.lat, info.long, date, info.description, gender, preferredGender, function(error, users) {
          console.log("!! after create user", error)

          // if there's an error => wrong JSON body
          if(error) {
              console.log("in create user if (error) ")

            var err = new Error("Error creating user and gender relationships, check JSON body format: " + error.message);
            err.status = 500;
            next(err);


          }
          else {
            res.json(users)
          }
            // console.log("in create user ELSE", users)
          // // CREATE gender relationship if NO error
            // if (!info.gender) {
            //   var gender = 'none'
            // } else {
            //   var gender = info.gender.toLowerCase()
            //   if (gender !== 'male' || gender !== 'female') {
            //     gender = 'none'
            //   }
            // }
            //
            // console.log("HELLO", gender)
            // if (!info.preferredGender) {
            //   var preferredGender = 'friends'
            // } else {
            //   var preferredGender = info.preferredGender.toLowerCase()
            // }
            // console.log("create user else", fbID, gender, preferredGender)
            //
            // User.createGenderRel(fbID, gender, preferredGender, function(error, user2) {
            //   console.log("! after create gender", error)
            //
            // // if there's an error something wrong with gender formats
            // if(error) {
            //   console.log("so deep")
            //   var err = new Error("Error creating gender relationship soo: " + error.message);
            //   err.status = 500;
            //   next(err);
            // } else {
            //   console.log(" gender done")
            //   // res.json(users)
            // }
          // })
        })
      } else {
        console.log("WTF")
        // found a user!!
        res.json(user)
      }
    });
  },

  // createUser: function(req, res, next) {
  //   var info = res.req.body
  //
  //   console.log("PARAMS", req.params.id.toString())
  //   console.log("BODY????", res.req.body)
  //
  //   User.createUser(info.fbID, info.name, info.birthday, info.age, info.photo, info.preferredLocationKM, info.preferredAgeMin, info.preferredAgeMax, info.lat, info.long, info.dateJoined, info.dateLastLogin, info.gender, info.preferredGender, info.description, function(error, user) {
  //     if(error) {
  //       var err = new Error("Error retrieving user: " + error.message);
  //       err.status = 500;
  //       next(err);
  //     } else {
  //
  //       //if it's successful, go ahead and make the gender association
  //       res.json(user)
  //     }
  //   });
  // },

  //DEPRECATED for MVP will be used when user settings is ENABLED.
  createGenderRel: function(req, res, next) {
    // req.params.id get it from url params
    console.log("PARAMS", req.params.id.toString())
    User.createGenderRel(req.params.id.toString(), function(error, user) {
        if(error) {
        var err = new Error("Error retrieving user: " + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(user)
      }
    });
  },

  // THIS SHOULD BE TRIGGERED AFTER USER HAS SEEN batches of 50 pictures
  findNewMatches: function(req, res, next) {
    // req.params.id get it from url params
    console.log('in find new matches')
    User.findNewMatches(req.params.fbID.toString(), function(error, matches) {
        // There are NO new matches...
        console.log('after find new matches')
        if(error) {
        var err = new Error("Error retrieving user: " + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(matches)
      }
    });
  },

  findExistingMatches: function(req, res, next) {
    // req.params.id get it from url params
    // console.log("PARAMS", req.params.id.toString())
    User.findNewMatches(fbID, function(error, user) {
        // There are NO new matches...
        if(error) {
        var err = new Error("Error retrieving user: " + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(user)
      }
    });
  },




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
  // },

  findNodes: function(req, res, next) {
    // res.body.alllll sorts of info from user
    // info.gender is an array []
    // info.preferredGender is an array []

    var info = res.req.body

    // nodes: User, Picture, Gender

    console.log("PARAMS", req.params.node.toString())
    // console.log("BODY????", res.req.body)
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


  // subset: function(req, res, next) {
  //   // console.log(req.query)
  //   // console.log("req params query: ", req.params.query)
  //   User.sort(req.params.query, req.query.n , req.query.p, function(error, custs) {
  //     // var n = req.params.n
  //     // var p = req.params.p
  //     if(error) {
  //     var err = new Error("Error retrieving customer list:\n" + error.message);
  //     err.status = 500;
  //     next(err);
  //     } else {
  //       res.json(custs)
  //     }
  //   });
  // }
}

module.exports = UserController;
