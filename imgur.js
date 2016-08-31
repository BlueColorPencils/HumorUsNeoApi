var https = require("https");
var async = require("async");
var Pic = require("./models/picture");

module.exports = function (album,topic,top,time,page) {

  // https://api.imgur.com/3/gallery/r/{subreddit}/{time|top}/{if the sort is "top", day | week | month | year | all}/{page - integer}
  // maybe I could keep trying a new page

  // :top/:time/:page/
  // var path = "/3/gallery/ r/funny /top/     month/     1
  // var path = "/3/topics/   funny    /top/   month/     1
  var path = "/3/"+album+"/"+topic+"/"+top+"/"+time+"/"+page.toString()
  console.log("img",path)
  var options = {
    protocol: "https:",
    host: 'api.imgur.com',
    path: path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.VALUE
    }
  };

  var req = https.get(options, function(res) {
    var body = "";
    res.on('data', function(data) {
      body += data;
    }).on('end', function() {
      var wholebody = JSON.parse(body);
      const dateAdded = Date.now()
      async.forEach(wholebody.data, function(info, callback) {
        if (info.type !== 'image/gif' && info.type !== undefined && ((info.height/info.width) < 2.5) && info.is_album == false && ((info.width/info.height) < 1.8)) {
           var link = "https"+info.link.slice(4,info.link.length)
          Pic.createPictureNode(info.id, info.title, link, dateAdded, info.type, function(error, match) {
            if(error) {
              next()
              // return callback()
            }
              return callback()
            })
        }
      }, function(error) {
        // future. IF error, get from a different route.
        if (error) {
          console.log("error with adding pictures..")
        } else {
          console.log("SUCCESS")
        }
      })
    })
  });

  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });

}
