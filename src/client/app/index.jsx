import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx'
import MatchList from './components/MatchList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
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
  }

  render () {
    return (
      <div>
        <h1> League App </h1>
        <h3>Search For Username</h3>
        <Search onSearch={this.search.bind(this)}/>
        <MatchList matches={this.state.matches}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));