require('dotenv').config()
var https = require("https");
var async = require("async");
var Pic = require("./models/picture");


var options = {
  protocol: "https:",
  host: 'api.imgur.com',
  path: '/3/gallery/r/funny/top/today',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.VALUE
  }
};

var req = https.get(options, function(res) {
  // console.log('STATUS: ', Object.keys(res), res.statusCode);
  // console.log('WTF: ', res.connection);
  // console.log('HEADERS: ', JSON.stringify(res.headers));
  // var x = JSON.stringify(res.headers).data

  // Buffer the body entirely for processing as a whole.
  // var bodyChunks = [];
  var body = "";
  res.on('data', function(data) {
    // You can process streamed parts here...
    // bodyChunks.push(data);
    body += data;
  }).on('end', function() {
    // var wholebody = Buffer.concat(bodyChunks);
    var wholebody = JSON.parse(body);
    const dateAdded = Date.now()
      async.each(wholebody.data, function(info, callback) {
        if (info.type !== 'image/gif' && info.type !== undefined) {
          Pic.createPictureNode(info.id, info.title, info.link, dateAdded, info.type, function(error, match) {
            // error with my query
            if(error) {
              // IF ERROR WE NEED TO TRY ANOTHER ROUTE??
              let err = new Error("Error creating a new match. Tell Cristal to check her Cypher query." + error.message);
              err.status = 500;
              // console.log("woof?", err)
              return
              // callback(err)
            }
              callback()
            })
          }
          }, function(error) {
            if (error) {
              let err = new Error("No new nodes to add" + error.message);
              err.status = 500;
              // return callback()
              console.log("meow?")
              // callback(err)
              // err.status = 500;
            } else {
              console.log("SUCCESS")
              // return callback()
              // res.json("SUCCESS")
            }

        }
      )
    // wholebody keys: data, success, status

    // wholebody.data[0] keys: id, title, description, datetime, type, animated, width, height, size, views, bandwidth, vote, favorite, nsfw, section, account_url, account_id, in_gallery, link, is_ad, comment_count, ups, downs, points, score, is_album

    // console.log('BODY: ' + wholebody.data[0].id);
    // console.log('BODYs: ' + wholebody.data[0][0]);
  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});


// var options = {
//     host: 'somesite.com',
//     port: 443,
//     path: '/some/path',
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };
