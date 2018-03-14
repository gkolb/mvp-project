import React from 'react';
import Match from './Match.jsx';

const MatchList = (props) => (
  <div>
    <h1>Recent Matches</h1>
    <table>
      <tbody>
      <tr>
        <th>Champion</th>
        <th>Role</th>
        <th>Match Date</th>
      </tr>
        {props.matches.map((match) => {
          console.log(match)
          return (<Match match = {match} key = {match.matchId}/>)
          }
        )}
      </tbody>
    </table>
  </div>
)

export default MatchList;