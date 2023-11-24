import React, { useState, useRef } from 'react'
import './GameScreen.css'

const GameScreen = ({verifyLetter, pickedCategory, pickedWord, letters, guesses,guessedLetters, wrongLetters, score}) => {

  const [letter, setLetter]= useState('')
  const letterInputRef = useRef(null)
  const handleSubmit=(e)=>{
    e.preventDefault()
    verifyLetter(letter)
    setLetter('')
    letterInputRef.current.focus()
  }

  return (
    <div>
      <div className="game">
        <p className="points">
          <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra:</h1>
          <h3 className='tip'>Dica sobre a palavra: <span>{pickedCategory}</span></h3>
          <p>Você ainda tem {guesses} tentativa(s)</p>
          <div className="wordContainer">
            {letters.map((letters, i)=>(
              guessedLetters.includes(letters) ? (
                <span key={i} className='letter'>{letters}</span>
              ):(
                <span key={i} className='blankSquare'></span>
              )
            ))}
          </div>
          <div className='letterContainer'>
            <p>Tente adivinhar uma letra da palavra:</p>

            <form onSubmit={handleSubmit}>
              <input type="text" name='letter' required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>

              <button>Jogar!</button>
            </form>
          </div>
          <div className="wrongLettersContainer">
            <p>Letras já utilizadas:</p>
            {wrongLetters.map((letter, i)=>(
              <span key={i}>{letter}, </span>
            ))}
          </div>
      </div>
    </div>
  )
}

export default GameScreen