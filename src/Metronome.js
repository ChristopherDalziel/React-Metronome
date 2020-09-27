import React, { useState } from "react";
import "./App.css";

const Metronome = () => {
  const { playing, setPlaying } = useState(false);
  let [bpm, setBpm] = useState(100);

  const handleBpmChange = (event) => {
    const bpmValue = event.target.value;
    setBpm = bpmValue;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>one one-thousand..</h1>
        <h1>two one-thousand..</h1>
      </header>
      <div className="metronome">
        <div className="metronome-bpm">
          <h2 className="metronome-bpm--current">{bpm} BPM</h2>
          <input type="range" min="60" max="240" value={bpm} />
        </div>
        <button className="metronome-button">
          {playing === true ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Metronome;