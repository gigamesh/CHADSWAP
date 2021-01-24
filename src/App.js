import React from 'react';
import fb from 'firebase';
import logo from './logo.svg';
import './App.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCLMDeqhqHDnXqTSitJvGtgVuN29duoxt4',
  authDomain: 'shitcoin-trends.firebaseapp.com',
  projectId: 'shitcoin-trends',
  storageBucket: 'shitcoin-trends.appspot.com',
  messagingSenderId: '356733166071',
  appId: '1:356733166071:web:dd4f01c542d8355ccf0ef2',
};

fb.initializeApp(firebaseConfig);
const functions = fb.functions();

if (process.env.NODE_ENV === 'development') {
  functions.useEmulator('localhost', 5001);
  // database.useEmulator("localhost", 9000);
}

function App() {
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await functions.httpsCallable('getTokenData')({ token: 'XRP' });
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
