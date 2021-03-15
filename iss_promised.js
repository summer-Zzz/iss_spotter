// const request = require('request-promise-native');

// const fetchMyIP = function() {
//   return request('https://api64.ipify.org?format=json');
// }


// const fetchCoordsByIP = function(body) {
//   const ip = JSON.parse(body).ip;
//   return request(`https://freegeoip.app/json/${ip}`);
// };

// const fetchISSFlyOverTimes = function(body) {
  // const latitude = JSON.parse(body).latitude;
  // const longitude = JSON.parse(body).longitude;
//   const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
//   return request(url);
// };

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api64.ipify.org?format=json');
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  // const { latitude, longitude } = JSON.parse(body).data;
  const latitude = JSON.parse(body).latitude;
  const longitude = JSON.parse(body).longitude;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
}

const nextISSTimesForMyLocation = function (body) {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };