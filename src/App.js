import './App.css';
import Images from './Images';
import { useState, useEffect } from "react";
import {shuffle} from 'lodash';
import Form from './components/Form/Form.js';

function App() {
  const [cards, setCards] = useState( shuffle([...Images, ...Images]) );
  const [timer, setTimer] = useState(0);
  const [won, setWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [gameStart, setGameStart] = useState(false)

  const resetTurn = () => {
    setActiveCards([])
    setDisabled(false)
  }

  useEffect(() => {
    if(gameStart){
      setTimeout(() => setTimer(timer + 1), 1000)
    }
    else{
      setTimer(0)
    }
  }, [gameStart, timer]);
    
 
  function flipCard(index) {
    setGameStart(true)
    if (won) {
      setCards(shuffle([...Images, ...Images]));
      setFoundPairs([]);
      setWon(false);
      setGameStart(false)
    }
    if(!disabled){
      if (activeCards.length === 0) {
        setActiveCards([index]);
      }
      if (activeCards.length === 1) {
        const firstIndex = activeCards[0];
        const secondsIndex = index;
        setDisabled(true)
        if (cards[firstIndex] === cards[secondsIndex]) {
          if (foundPairs.length + 2 === cards.length) {
            setWon(true);
            localStorage.setItem('user', timer)
            setGameStart(false)
          }
          setFoundPairs( [...foundPairs, firstIndex, secondsIndex] );
          setDisabled(false)         
        }
        else{
          setTimeout(() => resetTurn(), 800)
        }
        setActiveCards([...activeCards, index]);
      }
      if (activeCards.length === 2) {
        setActiveCards([index]);
        
      }
    }
    console.log(timer);
    
  }

  return (
    <div>
      <Form 
        timer={timer}
      />
      <div className="board">
        {cards.map((card,index) => {
          const flippedToFront =  (activeCards.indexOf(index) !== -1) || foundPairs.indexOf(index) !== -1;         
          return ( 
            <div className={"card-outer " + (flippedToFront ? 'flipped' : '')}
                 onClick={() => flipCard(index)}>
              <div className="card">
                <div className="front">
                  <img src={card} alt=""/>
                </div>
                <div className="back" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="stats">
        {won && (
          <div>You won the game! Congratulations!<br />
            Click any card to play again.<br /><br />
          </div>
        )}
        Time: {timer} &nbsp;&nbsp;&nbsp; Found pairs:{foundPairs.length/2}
      </div>
    </div>
  );
}

export default App;
