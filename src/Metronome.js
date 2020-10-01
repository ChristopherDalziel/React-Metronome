import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import soundOne from "./assets/click1.wav";
import soundTwo from "./assets/click2.wav";

const App = styled.div`
  text-align: center;
  font-family: Helvetica, Sans-Serif;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const BpmSlider = styled.input`
  width: 40vw;
`;

const Metronome = () => {
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [bpm, setBpm] = useState(100);
  const timer = useRef();
  const beatsPerMeasure = 4;
  const click1 = new Audio(soundOne);
  const click2 = new Audio(soundTwo);

  const clapAnimation = keyframes`
  from, 0%, 50%, 100%, to {
    transform: scale(1);
  }

  0% {
    transform: scale(6);
  }

  50% {
    transform: scale(2);
  }
`;

  const Clap = styled.div`
    animation: ${clapAnimation} 1s ${playing === true ? "infinite" : "none"};
  `;

  const playClickCallback = useCallback(() => {
    if (count % beatsPerMeasure === 0) {
      click2.play();
    } else {
      click1.play();
    }

    setCount((prevCount) => (prevCount + 1) % beatsPerMeasure);
  }, [count, click1, click2]);

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
    <App>
      <AppHeader className="App-header">
        <Clap>{count === 1 ? "👏🏻" : "🥁"}</Clap>
      </AppHeader>
      <div>
        <div className="metronome-bpm">
          <h2 className="metronome-bpm--current">{bpm} BPM</h2>
          <BpmSlider
            className="metronome-bpm--slider"
            type="range"
            min="60"
            max="175"
            value={bpm}
            onChange={onBpmChange}
          />
        </div>
        <button onClick={() => startStop()} className="metronome-button">
          {playing === true ? "Stop" : "Start"}
        </button>
        <button onClick={() => setBpm(100)}>Reset</button>
      </div>
    </App>
  );
};

export default Metronome;
