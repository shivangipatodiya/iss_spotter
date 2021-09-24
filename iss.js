const request = require("request");

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data

    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

const fetchCoordsByIP = (ip, cb) => {
  request(" https://freegeoip.app/json/", (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    cb(null, { latitude: data.latitude, longitude: data.longitude });
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    "https://iss-pass.herokuapp.com/json/?lat=53.5185&lon=-113.6579",
    (error, response, body) => {
      if (error) {
        callback(error, null);
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const data = JSON.parse(body);
      callback(null, data.response);
    }
  );
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error1, data) => {
      if (error1) {
        return callback(error1, null);
      }
      fetchISSFlyOverTimes(data, (error2, response) => {
        if (error2) {
         return callback(error2, null);
        }
        callback(null, response);
      })
    })
  })
}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
