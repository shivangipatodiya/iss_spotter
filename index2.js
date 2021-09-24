const { nextISSTimesForMyLocation } = require("./iss_promised");

// fetchMyIP()
// .then(fetchCoordsByIP)
// .then(fetchISSFlyOverTimes)
// .then((body) => console.log(body))

nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (const el of passTimes) {
      console.log(
        `Next pass at ${new Date(el["risetime"] * 1000).toString()} for ${
          el["duration"]
        } seconds!`
      );
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
