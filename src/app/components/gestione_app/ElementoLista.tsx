import React from 'react';

function ElementoLista(
  index: number,
  name: string,
  surname: string
): JSX.Element {
  return (
    <div key={index}>
      {index} {name} {surname} <br />
    </div>
  );
}

export default ElementoLista;
