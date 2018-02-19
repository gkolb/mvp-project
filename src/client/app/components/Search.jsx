import React from 'react';
import ReactDom from 'react-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e) {
    this.setState({
      text: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.text);
  }

  render() {
    return (
    <div>
      <input
        type = "text"
        value = {this.state.text}
        onChange={this.onChange}
      />
      <button onClick={this.search}>Search</button>
    </div>
    )
  }
}

export default Search;