var Pic = require("../models/picture");
var Imgur = require("../imgur");
// var ImgurController = require("../imgur");

var PicController = {

  // var path = "/3/gallery/ r/funny /top/     month/     1
  // var path = "/3/topics/   funny    /top/   month/     1
  // var path = "/3/"+album+"/"+topic+"/"+top+"/"+time+"/"+page.toString()

  imgur: function(req, res, next) {
    // if there's less than 100 unseen pictures left, call imgurs api
    if (req.unseencount < 300) {
      Imgur('gallery', 'r/funny', 'top','week', '1')
      Imgur('gallery', 'r/funny', 'top','week', '2')
      Imgur('gallery', 'r/funny', 'top','week', '3')
      Imgur('gallery', 'r/funny', 'top','week', '4')
      Imgur('gallery', 'r/funny', 'top','week', '5')
      Imgur('gallery', 'r/funny', 'top','week', '6')
      res.status(204).send({})
    }
  },

  imgurs: function(req, res, next) {
    var album = req.params.album
    var topic = req.params.topic
    var top = req.params.top
    var time = req.params.time
    var page = req.params.page
    // :top/:time/:page/
    console.log("imgurs", album, topic, top, time, page)
      Imgur(album,topic,top,time,page)
      res.status(204).send({})
  },

  findUnseenPictures: function(req, res, next) {
    // '/picture/:fbID/unseen'
    var fbID = req.params.fbID.toString()
    console.log("IN FIND UNSEEN PICS", fbID)
    Pic.findUnseenPictures(fbID, function(error, picture) {
      // if error receiving picture
      // ADD FUNCTIONALITY TO ADD MORE PICS FROM IMGUR
      if(error) {
        console.log("find unseen error", error)
        var err = new Error("Error retrieving unseen pictures:\n" + error.message);
        err.status = 500;
        next();
      } else {
        console.log("here's your picture", picture)
        res.json(picture)
        // req.unseencount = picture[0]
        next()
      }
    });
  },

    findUnseenPicturesCount: function(req, res, next) {
      // '/picture/:fbID/unseencount'
      var fbID = req.params.fbID
      Pic.findUnseenPicturesCount(fbID, function(error, picture) {
        // if error receiving picture
        // ADD FUNCTIONALITY TO ADD MORE PICS FROM IMGUR
        if(error) {
          console.log("error")
          var err = new Error("Error retrieving unseen pictures:\n" + error.message);
          err.status = 500;
          next(err);
        } else {
          console.log("unseen picture count", picture)
          // res.json(picture)
          req.unseencount = picture
          next()
        }
      });
    },


  findSeenPicturesCount: function(req, res, next) {
    // '/picture/:fbID/seen'
    var fbID = req.params.fbID
    console.log("HERE")

    Pic.findSeenPicturesCount(fbID, function(error, picturecount) {
      if(error) {
        var err = new Error("Error retrieving seen picture:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        req.fbID = fbID
        req.picturecount = picturecount
        next()
        // res.json(picturecount)
      }
    });
  },


  createPictureRel: function(req, res, next) {
    // '/picture/relationship'
    console.log("HUH", res.req.body)
    var info = res.req.body
    var dateAdded = Date.now().toString()
    if (info.relationship.toUpperCase() == 'LIKES' || info.relationship.toUpperCase() == 'DISLIKES') {
      Pic.createPictureRel(info.fbID, info.imgurID, info.relationship, dateAdded, function(error, picture) {
        // if error receiving picture
        if(error) {
          var err = new Error("Error creating picture relationship to user:" + error);
          err.status = 500;
          next(err);
        } else {
          console.log("what")
          // next()
          res.json(picture)
        }
      });
    } else {
      res.json("Incorrect relationship given. Check JSON")
    }
  }

}

module.exports = PicController;
