import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './components/AwesomeComponent.jsx';
import Search from './components/Search.jsx'

class App extends React.Component {
  render () {
    return (
      <div>
        <h1> League App </h1>
        <h3>Search For Username</h3>
        <Search />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));