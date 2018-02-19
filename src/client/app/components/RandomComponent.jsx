import React from 'react';
import ReactDom from 'react-dom';

const RandomComponent = (props) => (
      <div>
      {props.topChamps.map((champ) => {
          console.log(champ)
          return (<div key={champ.champ}> Champ: {champ.champ} Play Count: {champ.count}</div>)
          }
        )}

      </div>
    )


export default RandomComponent;