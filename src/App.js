import React from 'react';
import fb from 'firebase';
import logo from './logo.svg';
import './App.css';
import firebaseConfig from './.firebaseConfig';

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
