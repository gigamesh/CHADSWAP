const functions = require('firebase-functions');
const googleTrends = require('google-trends-api');

exports.getTokenData = functions.https.onCall(async ({ token }) => {
  let results = [];
  const options = {
    keyword: token,
    startTime: new Date(1579824000000),
    granularTimeResolution: true,
  };
  try {
    results = JSON.parse(await googleTrends.interestOverTime(options));
    return results.default.timelineData;
  } catch (err) {
    console.error(err);
  }
  return results;
});
