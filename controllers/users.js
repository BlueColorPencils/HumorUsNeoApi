var User = require("../models/user");

var UserController = {
  findUser: function(req, res, next) {
    // req.params.id get it from url params
    console.log("PARAMS", req.params.id.toString())
    User.findUser(req.params.id.toString(), function(error, user) {
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
    var info = res.req.body

    console.log("PARAMS", req.params.id.toString())
    console.log("BODY????", res.req.body)

    User.createUser(info.fbID, info.name, info.birthday, info.age, info.photo, info.preferredLocationKM, info.preferredAgeMin, info.preferredAgeMax, info.lat, info.long, info.dateJoined, info.dateLastLogin, info.gender, info.preferredGender, info.description, function(error, user) {
      if(error) {
        var err = new Error("Error retrieving user: " + error.message);
        err.status = 500;
        next(err);
      } else {

        //if it's successful, go ahead and make the gender association
        res.json(user)
      }
    });
  },

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
