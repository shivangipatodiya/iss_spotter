const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('75.159.222.79', (error, data) => {
//   console.log(error);
//   console.log(data);
// })

// fetchISSFlyOverTimes(
//   { latitude: 53.5185, longitude: -113.6579 },
//   (error, response) => {
//     console.log(error);
//     console.log(response);
//   }
// );

const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const el of passTimes) {
    console.log(
      `Next pass at ${new Date(el["risetime"] * 1000).toString()} for ${
        el["duration"]
      } seconds!`
    );
  }
});
