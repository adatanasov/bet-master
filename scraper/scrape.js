// Execute here to get all league fixtures: https://www.bet365.com/#/AC/B1/C1/D13/E51761579/F2/

var table = document.getElementsByClassName('gl-MarketGroupContainer')[0];
var firstCol = table.childNodes[0];
var firstColRows = firstCol.childNodes;

var result = [];

var dateFixtures = null;
for (i = 0; i < firstColRows.length; i++) {
    var row = firstColRows[i];
    if (row.className.includes('rcl-MarketHeaderLabel-isdate')) {
        if (dateFixtures) {
            result.push(dateFixtures);
        }
        dateFixtures = { "date": row.textContent, "fixtures": [] };
    } else {
        dateFixtures.fixtures.push({});
        if (i === firstColRows.length - 1) {
            result.push(dateFixtures);
        }
    }
}

var times = document.getElementsByClassName("rcl-ParticipantFixtureDetails_BookCloses");
var teams = document.getElementsByClassName("rcl-ParticipantFixtureDetails_Team");

var homeTeamNumbers = document.evaluate('//*[contains(@class, "sgl-MarketOddsExpand")][1]/div/span', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var xTeamNumbers = document.evaluate('//*[contains(@class, "sgl-MarketOddsExpand")][2]/div/span', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var guestTeamNumbers = document.evaluate('//*[contains(@class, "sgl-MarketOddsExpand")][3]/div/span', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var homeCoef = [];
var xCoef = [];
var guestCoef = [];
for (let i = 0; i < homeTeamNumbers.snapshotLength; i++) {
    homeCoef.push(parseFloat(homeTeamNumbers.snapshotItem(i).textContent));
    xCoef.push(parseFloat(xTeamNumbers.snapshotItem(i).textContent));
    guestCoef.push(parseFloat(guestTeamNumbers.snapshotItem(i).textContent));
}

var index = 0;
for (let i = 0; i < result.length; i++) {
    var day = result[i];
    for (let j = 0; j < day.fixtures.length; j++) {
        var fixture = day.fixtures[j];

        fixture.time = times[index].textContent;
        fixture.teams = [teams[index * 2].textContent, teams[index * 2 + 1].textContent];
        fixture.coef = [homeCoef[index], xCoef[index], guestCoef[index]];

        index++;
    }
}

console.log(result);