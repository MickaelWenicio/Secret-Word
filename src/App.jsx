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
  const [gameStage, setGameStage]= useState(stages[0].name)// define stage (screen)
  const [pickedWord,setPickedWord] = useState('')
  const [pickedCategory,setPickedCategory] = useState('')

  const [letters, setLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const[guesses, setGuesses] = useState(5)
  const[score, setScore] = useState(0)


  //FUNCTIONS
  const pickWordAndCategory = useCallback(()=>{
    //pick a random category
    const categories = Object.keys(words)
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)]
    //pick a random word
    const word = words[selectedCategory]
    const selectedWord = word[Math.floor(Math.random() * word.length)]

    return {selectedCategory, selectedWord}
  },[words])

  //start secret word game
  const startGame=useCallback(()=>{
    setGameStage(stages[1].name)
    const {selectedCategory, selectedWord} = pickWordAndCategory()
    //create a array of letters
    let wordLetters = selectedWord.split("")
    wordLetters = wordLetters.map((l)=> l.toLowerCase())
    //fill States
    setPickedWord(selectedWord)
    setPickedCategory(selectedCategory.toLocaleUpperCase())
    setLetters(wordLetters)
  }, [pickWordAndCategory])

  //process the letter input
  const verifyLetter=(letter)=>{
    const normalizeLetter = letter.toLowerCase()
    console.log(normalizeLetter)
    if(guessedLetters.includes(normalizeLetter) || wrongLetters.includes(normalizeLetter)){
      return
    }

    //push guessed letter or remove a guess
    if(letters.includes(normalizeLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters, normalizeLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters, normalizeLetter
      ])

      //game over
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates=()=>{
    setGuessedLetters([])
    setWrongLetters([])
  }

  //check if guesses ended
  useEffect(()=>{
    if(guesses <= 0){
      //reset all stages
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  })

  //check win condition
  useEffect(()=>{
    const uniqueLetters=[... new Set(letters)]
    console.log(uniqueLetters)
    //win condition
    if(guessedLetters.length === uniqueLetters.length){
      //add score
      setScore((actualScore)=> actualScore += 100)
      //restart game with new word
      clearLetterStates()
      startGame()
    }
    
  },[guessedLetters,letters, startGame])

  //restart the game
  const restartTheGame=()=>{
    setScore(0)
    setGuesses(5)
    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage==='start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <GameScreen 
        pickedCategory={pickedCategory} 
        pickedWord={pickedWord} 
        letters={letters} 
        guesses={guesses}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        score={score}
        verifyLetter={verifyLetter}
        />}
      {gameStage === 'end' && <EndScreen retry={restartTheGame} score={score}/>}
    </div>
  )
}

export default App
