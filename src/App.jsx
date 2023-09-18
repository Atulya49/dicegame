import React, { useState } from 'react'
import Dice from './Dice'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
const App = () => {
  
  const [bestTimeNumber,setBestTimeNumber] = useState(Number.MAX_VALUE);

  const [tenzies,setTenzies]=useState(false);
  const generateNewDice=()=>{
    return {
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid() 
    }
  }
  const allNewDice=()=>{
    const newDice=[];
    for(let i=0;i<10;i++)
    {
      newDice.push(generateNewDice())
    }
    return newDice;
  }
  
  const [dice, setDice]=useState(allNewDice());
  React.useEffect(
    ()=>{
     const allHeld=dice.every(x=>x.isHeld) 
    const firstValue=dice[0].value;
    const allSameValue=dice.every(x=> x.value===firstValue)
    if(allHeld && allSameValue)
   { setTenzies(true)
     console.log("You Won!")          
    }
    },[dice])

   
  const rollDice=()=>{
    if(!tenzies)
    {
    setAttempts(attempts+1)
    setDice(oldDice=>oldDice.map(x=>{
            return x.isHeld? x: generateNewDice()
    }))
  }
  else{
    console.log(bestTimeNumber);
    let x = Math.min(bestTimeNumber,attempts);
    setBestTimeNumber(x);
     console.log(x);
    setTenzies(false)
    setDice(allNewDice())
   
      //console.log(bestTimeNumber);
      setAttempts(0)
  }
  // if(!tenzies)
  //    setAttempts(attempts+1)
  //   else
  //   {
  //     bestTimeNumber = Math.min(bestTimeNumber,attempts);
  //     console.log(bestTimeNumber);
  //     setAttempts(0)

  //   }
    // if(tenzies && attempts<bestTime)
    // {
    //    setbestTime(attempts)
    // }
  }
   const [attempts,setAttempts]=useState(0);
  const holdDice=(id)=>{
      setDice(oldDice=> oldDice.map(x=>{
        return x.id===id?{...x,isHeld:!x.isHeld}:x
      }))
      
  }
  const diceElements=dice.map(x=> 
  <Dice key={x.id} 
  value={x.value}
  isHeld={x.isHeld}
  holdDice={()=>holdDice(x.id)}
  />);
  return (
    <main>
      {bestTimeNumber}
      {tenzies && <Confetti/>}
      <h1 className='title'>TENZIES</h1>
      <p className='instructions'> Roll until all dice are same. click each die to freeze 
      it at its current value between rolls.</p>
      <h3> LeastMoves:{bestTimeNumber}</h3>
      <div className="dice-container">
         {diceElements}
    </div>
    <button className='roll-dice' onClick={rollDice}> {tenzies? 'NewGame': 'Roll'} </button>
    <h3>Attempts: {attempts}</h3>
    </main>
  )
}
export default App
