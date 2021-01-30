const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
const googleTrends = require('google-trends-api');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://shitcoin-trends-default-rtdb.firebaseio.com/',
});

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

const db = admin.database();

const START_TIME = 1609459200000; // 1/1/2021 12am

const tokens = [
  'DOGE',
  // 'XLM',
  // 'ADA',
  // 'LINK',
  // 'LTC',
  // 'AAVE',
  // 'UNI',
  // 'SUSHI',
  // 'SNX',
  // 'CEL',
  // 'ATOM',
  // 'MKR',
  // 'SUSHI',
  // 'COMP',
  // 'AVAX',
  // 'Yearn',
  // 'SOL',
  // 'GRT',
  // 'UMA',
  // 'Loopring',
];

const main = async () => {
  for (const token of tokens) {
    let results = [];
    const options = {
      keyword: token,
      startTime: new Date(START_TIME),
      granularTimeResolution: true,
    };
    try {
      console.log('fetching...');
      results = JSON.parse(await googleTrends.interestOverTime(options));
      console.log('results', results.default.timelineData);
    } catch (err) {
      console.error(err);
    }
    pause(1000);
    // db.ref(`google/${token}`).update(results);
  }
};

main();
