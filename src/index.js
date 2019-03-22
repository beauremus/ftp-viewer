import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dpm from './Dpm';
import Ftp from './Ftp';
import * as serviceWorker from './serviceWorker';

const request = "G:SCTIME@P,15H";

ReactDOM.render(
  <Dpm drf={request}>
    {dpm => {
      if (!dpm.data) {
        return <p>No data yet ...</p>;
      }

      if (dpm.error) {
        return <p>{dpm.error.message}</p>;
      }

      if (dpm.isLoading) {
        return <p>Loading ...</p>;
      }

      return <Ftp width={800} height={450} data={dpm[request]} />;
    }}
  </Dpm>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
