
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

  
// fetchCoordsByIP ('183.69.202.116', (error, coords) => {
//   if (error){
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned latitude and longitude:' , coords);
// });

// fetchISSFlyOverTimes({ latitude: 29.5569, longitude: 106.5531 }, (error, passTime) => {
//   if (error){
//     console.log('Unable to fetch pass time:', error);
//     return;
//   } 
//   console.log('It worked! Returned pass time: ', passTime);
// });

// nextISSTimesForMyLocation((error, passTimes) => {
//   fetchMyIP((error, ip) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }
//     fetchCoordsByIP ('183.69.202.116', (error, coords) => {
//       if (error){
//         console.log("It didn't work!" , error);
//         return;
//       }
//       fetchISSFlyOverTimes({ latitude: 29.5569, longitude: 106.5531 }, (error, passTime) => {
//         if (error){
//           console.log('Unable to fetch pass time:', error);
//           return;
//         } 
//         console.log(passTimes);
//       });
//     });
//   });
// });



const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});