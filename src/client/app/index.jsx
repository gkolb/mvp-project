import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx'
import MatchList from './components/MatchList.jsx'
import RandomComponent from './components/RandomComponent.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      topChamps: []
    }
  }

  search (val) {
    $.ajax({
      url: '/matches',
      method: 'POST',
      data: {data: val},
      success: function(result){
        this.setState({
          matches: result
        });
        console.log(this.state)
      }.bind(this),
      error: function() {
        console.log('failed search')
      }
    })
    $.ajax({
      url: '/champions',
      method: 'POST',
      data: {data: val},
      success: function(result){
        this.setState({
          topChamps: result
        });
        console.log(this.state)
      }.bind(this),
      error: function() {
        console.log('failed search')
      }
    })
  }

  render () {
    return (
      <div>
        <h1> League App </h1>
        <h3>Search For Username</h3>
        <Search onSearch={this.search.bind(this)}/>
        <RandomComponent topChamps={this.state.topChamps}/>
        <MatchList matches={this.state.matches}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));