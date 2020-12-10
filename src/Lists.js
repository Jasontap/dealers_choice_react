import React from 'react';

const Lists = (props) => {
  console.log('hello List component')
  return (
    <div>
      <h1>Listssss</h1>
      <p>{ props.name }</p>
    </div>
  )
}

export default Lists;