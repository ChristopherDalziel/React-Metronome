import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import soundOne from "./assets/click1.wav";
// import soundTwo from "./assets/click2.wav";

const Metronome = () => {
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [bpm, setBpm] = useState(100);
  const timer = useRef();
  const beatsPerMeasure = 4;
  const click1 = new Audio(soundOne);
  // const click2 = new Audio(soundTwo);

  const playClickCallback = useCallback(() => {
    click1.play();

    setCount((prevCount) => (prevCount + 1) % beatsPerMeasure);
  }, [count, click1]);

  useEffect(() => {
    if (playing) {
      clearInterval(timer.current);
      timer.current = setInterval(playClickCallback, (60 / bpm) * 1000);
    } else {
      clearInterval(timer.current);
    }
  }, [bpm, playing, playClickCallback]);

  const startStop = () => {
    if (playing) {
      setPlaying(false);
    } else {
      setCount(0);
      setPlaying(true);
    }
  };

  const onBpmChange = (e) => {
    setBpm(e.target.value);

    if (playing) {
      setCount(0);
    }
  };

  console.log(count);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{count}</h1>
      </header>
      <div className="metronome">
        <div className="metronome-bpm">
          <h2 className="metronome-bpm--current">{bpm} BPM</h2>
          <input
            className="metronome-bpm--slider"
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={onBpmChange}
          />
        </div>
        <button onClick={() => startStop()} className="metronome-button">
          {playing === true ? "Stop" : "Start"}
        </button>
        <button onClick={() => setBpm(100)}>Reset</button>
      </div>
    </div>
  );
};

export default Metronome;
