/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");



const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api64.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error){
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`), null);
      return;
    } 
      // const latitude = JSON.parse(body).latitude;
      // const longitude = JSON.parse(body).longitude;
      const { latitude, longitude } = JSON.parse(body);
      callback(null, { latitude, longitude });
      return;
  })
}

const fetchISSFlyOverTimes = function (coords, callback){
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`
  
  request(url, (error, response, body) => {
    if (error){
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200){
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass time. Response: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  })
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    } 
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback (error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback (error, null);
        }
        callback(null, nextPasses);
      })
    })
  }) 
}



module.exports = { nextISSTimesForMyLocation };