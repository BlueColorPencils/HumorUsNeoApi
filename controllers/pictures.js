var Pic = require("../models/picture");

var PicController = {
  unseenByPerson: function(req, res, next) {
    // req.params.id get it from url params
    Pic.unseenByPerson('Ann', function(error, picture) {
        if(error) {
        var err = new Error("Error retrieving picture:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(picture)
      }
    });
  }

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
