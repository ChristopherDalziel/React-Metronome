import React, { useState } from "react";
import "./App.css";

const Metronome = () => {
  const [playing, setPlaying] = useState(false);
  let [bpm, setBpm] = useState(100);

  const onBpmChange = (e) => {
    e.preventDefault();
    let newBpmValue = e.target.value;
    setBpm(newBpmValue);
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
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={onBpmChange}
          />
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          className="metronome-button"
        >
          {playing === true ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Metronome;
