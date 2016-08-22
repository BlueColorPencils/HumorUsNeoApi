var Pic = require("../models/picture");

var PicController = {
  findUnseenPictures: function(req, res, next) {
    // '/picture/:fbID/unseen'
    var fbID = req.params.fbID

    Pic.findUnseenPictures(fbID, function(error, picture) {
      // if error receiving picture
      // ADD FUNCTIONALITY TO ADD MORE PICS FROM IMGUR
      if(error) {
        var err = new Error("Error retrieving unseen pictures:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(picture)
      }
    });
  },

  findSeenPictures: function(req, res, next) {
    // '/picture/:fbID/seen'
    var fbID = req.params.fbID

    Pic.findSeenPictures(fbID, function(error, picturecount) {
      if(error) {
        var err = new Error("Error retrieving seen picture:\n" + error.message);
        err.status = 500;
        next(err);
      } else if (picturecount % 50 == 0) {
        console.log("findseenpictures")
        res.json("yo")
      } else {
        res.json(picturecount)
      }
    });
  },

  createPictureNode: function(req, res, next) {
    //'/pictures'
    var info = res.req.body
    var dateAdded = Date.now()

    if (Object.keys(info).length !== 0) {
      Pic.createPictureNode(info.imgurID, info.title, info.name, info.description, info.link, dateAdded, info.type, function(error, picture) {
        // if error receiving picture
        if(error) {
          var err = new Error("Error creating picture node: " + error.fields[0].message);
          err.status = 500;
          next(err);
        } else {
          res.json(picture)
        }
      })
    } else {
      res.json("ERROR: NO PICTURE CREATED. Check the JSON format, did you send anything?")
    }
  },

  createPictureRel: function(req, res, next) {
    // '/picture/relationship'
    var info = res.req.body
    var dateAdded = Date.now()
    if (info.relationship.toUpperCase() == 'LIKES' || info.relationship.toUpperCase() == 'DISLIKES') {
      Pic.createPictureRel(info.fbID, info.imgurID, info.relationship, dateAdded, function(error, picture) {
        // if error receiving picture
        if(error) {
          var err = new Error("Error creating picture relationship to user:" + error);
          err.status = 500;
          next(err);
        } else {
          res.json(picture)
        }
      });
    } else {
      res.json("Incorrect relationship given. Check JSON")
    }
  }

  // //
  // createPictureNodes: function(req, res, next) {
  //   //'/pictures'
  //   var information = res.req.body
  //   var dateAdded = Date.now()
  //   // console.log("CREATE PIC NODES", Object.keys(information).length)
  //   // console.log("PIC NODES INFO", information)
  //   if (Object.keys(information).length !== 0) {
  //     for (var key in information) {
  //       // console.log("INFO", key)
  //       var info = information[key]
  //       Pic.createPictureNodes(info.imgurID, info.title, info.name, info.description, info.link, dateAdded, info.type, function(error, picture) {
  //       console.log("1!!", error)
  //         // if error receiving picture
  //         if(error) {
  //           console.log("0 error")
  //         var err = new Error("Error creating picture:\n" + error.message);
  //         err.status = 500;
  //         next(err);
  //         } else {
  //           console.log("2!!!")
  //         }
  //       console.log("2.5!!!")
  //       });
  //       console.log("3!!")
  //     }
  //     console.log("4!!!")
  //     res.json("SUCCESS")
  //   } else{
  //     res.json("Check the JSON format, did you send anything?")
  //   }
  // }

// const https = require('https');
//
// var options = {
//   hostname: 'encrypted.google.com',
//   port: 443, <- maybe I don't need this
//   path: '/',
//   method: 'GET'
// };

// var req = https.request(options, (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);
//
//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
// });
// req.end();
//
// req.on('error', (e) => {
//   console.error(e);
// });

// https://nodejs.org/api/https.html#https_https_request_options_callback


  //
  // subset: function(req, res, next) {
  //   // console.log(req.query)
  //   // console.log("req params query: ", req.params.query)
  //   Pic.sort(req.params.query, req.query.n , req.query.p, function(error, custs) {
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

module.exports = PicController;
