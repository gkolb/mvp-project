import React from 'react';
import moment from 'moment';

const Match = (props) => (
  <tr>
    <td>{props.match.champion}</td>
    <td>{props.match.lane}</td>
    <td>{moment(props.match.time).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
  </tr>
)

export default Match;