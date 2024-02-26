import React, { useState, useEffect } from 'react';

const Dice = () => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [diceFace, setDiceFace] = useState(1);
  const [selectedFace, setSelectedFace] = useState(null);
  const [trials, setTrials] = useState(0);
  const [minTrials, setMinTrials] = useState(null);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let interval;
    if (isShuffling) {
      let count = 0;
      interval = setInterval(() => {
        const randomFace = Math.floor(Math.random() * 6) + 1;
        setDiceFace(randomFace);
        count++;
        if (count >= 50) {
          clearInterval(interval);
          setIsShuffling(false);
          checkMatch(selectedFace, randomFace);
        }
      }, 20);
    }
    return () => clearInterval(interval);
  }, [isShuffling, selectedFace]);

  const selectFace = (face) => {
    if (!isShuffling && !gameOver) {
      setSelectedFace(face);
      setTrials(trials + 1);
      setIsShuffling(true);
    }
  };

  const checkMatch = (selected, random) => {
    if (selected === random) {
      const newMinTrials = minTrials === null || trials < minTrials ? trials : minTrials;
      setMinTrials(newMinTrials);
      setTrials(0);
      setMessage('Hurray! Victory belongs to you.');
      setGameOver(true);
    }
  };

  const playAgain = () => {
    setSelectedFace(null);
    setTrials(0);
    setMessage('');
    setGameOver(false);
  };

  return (
    <div className='random-dice'>
      <div className={`dice ${isShuffling ? 'shuffling' : ''}`}>
        <img src={`./images/dice-six-faces-${diceFace}.png`} alt={`Dice face ${diceFace}`} />
      </div>
      <br></br>
      <p><h2>Select your dice:</h2></p>
      <div>
        {[1, 2, 3, 4, 5, 6].map(face => (
          <button className='selection-dice' key={face} onClick={() => selectFace(face)} disabled={isShuffling || gameOver}>
            <img src={`./images/dice-six-faces-${face}.png`} alt={`Dice face ${face}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </button>
        ))}
      </div>
      <p>Number of Trials: {trials}</p>
      <p>Least Number of Trials: {minTrials !== null ? minTrials : '-'}</p>
      {message && (
        <div className='victory'>
          <p>{message}</p>
          <button className='play' onClick={playAgain}>Play Again!</button>
        </div>
      )}
    </div>
  );
};

export default Dice;
