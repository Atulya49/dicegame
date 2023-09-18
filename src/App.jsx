import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
const App = () => {
  const [bestTimeNumber, setBestTimeNumber] = useState(Number.MAX_VALUE);
  const [tenzies, setTenzies] = useState(false);

  const generateNewDice = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  };

  const [dice, setDice] = useState(allNewDice());

  useEffect(() => {
    const allHeld = dice.every((x) => x.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((x) => x.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You Won!");
    }
  }, [dice]);

  //onlcick function
  const [attempts, setAttempts] = useState(0);
  const rollDice = (e) => {
    e.preventDefault();
    if (tenzies) {
      setBestTimeNumber(Math.min(attempts, bestTimeNumber));
      setAttempts(0);
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setAttempts(attempts + 1);
      setDice((oldDice) =>
        oldDice.map((x) => {
          return x.isHeld ? x : generateNewDice();
        })
      );
    }
  };

  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((x) => {
        return x.id === id ? { ...x, isHeld: !x.isHeld } : x;
      })
    );
  };
  const diceElements = dice.map((x) => (
    <Dice
      key={x.id}
      value={x.value}
      isHeld={x.isHeld}
      holdDice={() => holdDice(x.id)}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">TENZIES</h1>
      <p className="instructions">
        Roll until all dice are same. click each die to freeze it at its current
        value between rolls.
      </p>
      <h3>
        {" "}
        LeastMoves:{bestTimeNumber === Number.MAX_VALUE ? 0 : bestTimeNumber}
      </h3>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "NewGame" : "Roll"}
      </button>
      <h3>Attempts: {attempts}</h3>
    </main>
  );
};
export default App;
