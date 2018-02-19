import React from 'react';

const Match = (props) => (
  <tr>
    <td>{props.match.champion}</td>
    <td>{props.match.lane}</td>
    <td>{props.match.time}</td>
  </tr>
)

export default Match;