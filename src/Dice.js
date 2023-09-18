import React from 'react'

const Dice = (props) => {
  
  return (
    <div className='dice-face'  
    style={{backgroundColor:props.isHeld?"green" :"white"}} 
    onClick={props.holdDice}>
      <h2 className='dice-num'>{props.value}</h2>
    </div>
  )
}
export default Dice
