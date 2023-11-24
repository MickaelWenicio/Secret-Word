import React from 'react'

const GameScreen = ({verifyLetter}) => {
  return (
    <div>
      <button onClick={verifyLetter}>Finalizar</button>
    </div>
  )
}

export default GameScreen