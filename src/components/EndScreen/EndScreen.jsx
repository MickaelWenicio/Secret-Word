import React from 'react'

const EndScreen = ({retry}) => {
  return (
    <div>
      <button onClick={retry}>Reiniciar</button>
    </div>
  )
}

export default EndScreen