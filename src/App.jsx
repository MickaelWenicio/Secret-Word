// React
import { useCallback, useEffect, useState } from 'react'
//Data
import { wordsList } from './data/words'
//Components
import StartScreen from './components/StartScreen/StartScreen.jsx'
import GameScreen from './components/GameScreen/GameScreen.jsx'
import EndScreen from './components/EndScreen/EndScreen.jsx'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {
  //CONSTS
  const [words] = useState(wordsList)
  const [gameStage, setGameStage]= useState(stages[0].name)
  const [pickedWord,setPickedWord] = useState('')
  const [pickedCategory,setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])


  //FUNCTIONS
  const pickWordAndCategory = ()=>{
    //pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random()* Object.keys(categories).length)]
    console.log(category)
  }

  //start secret word game
  const startGame=()=>{
    setGameStage(stages[1].name)
    pickWordAndCategory()
  }

  //process the letter input
  const verifyLetter=()=>{
    setGameStage(stages[2].name)
  }

  //restart the game
  const restartTheGame=()=>{
    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage==='start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <GameScreen verifyLetter={verifyLetter}/>}
      {gameStage === 'end' && <EndScreen retry={restartTheGame}/>}
    </div>
  )
}

export default App
