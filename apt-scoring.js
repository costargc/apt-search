var fs = require("fs");
const geolib = require('geolib');

// load SP_ALL
var Search = fs.readFileSync("scraping/SP_all.json");
var fileSearch = JSON.parse(Search);

// load interest points
var Points = fs.readFileSync("points/interestpoints.json");
var filePoints = JSON.parse(Points);
var results = []

for (var i = 0; i < fileSearch.length; i++) {
    let score = 0;
    for (var j = 0; j < filePoints.length; j++) {

        // console.log(fileSearch[i].latitude, fileSearch[i].longitude, filePoints[j].latitude, filePoints[j].longitude);

        distance = geolib.getDistance(
            { latitude: fileSearch[i].latitude, longitude: fileSearch[i].longitude },
            { latitude: filePoints[j].latitude, longitude: filePoints[j].longitude }
        );

        if (filePoints[j].reward == "positive") { reward = 0 } else { reward = -1 }

        if (distance < 1000) {
            score = score + 1 * (-1) ** (reward)
        }
        else {
            score = score + (1 / (distance / 1000) ** 2) * (-1) ** (reward)
        }
    }

    results.push(
        {
            score: score,
            address: fileSearch[i].address,
            price1: fileSearch[i].price1,
            price2: fileSearch[i].price2,
            "classification": fileSearch[i].classification,
            "link": fileSearch[i].link,
        }
    )

}

results.sort(function (a, b) {
    return b.score - a.score;
});

console.log(results);
