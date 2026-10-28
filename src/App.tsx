import './styles/global.css';
import ProgressBar from './components/ProgressBar/ProgressBar.tsx';
import CycleSelection, {type CycleType} from './components/CycleSelection/CycleSelection.tsx';
import Timer from './components/Timer/Timer.tsx';
import ControlButtons from './components/ControlButtons/ControlButtons.tsx';
import { useCallback, useEffect, useState } from 'react';

const CYCLE_DURATIONS: Record<CycleType, number> = {
  "focus": 30,
  "long": 15,
  "short": 5
};

const CYCLE_COLORS: Record<CycleType, string> = {
  "focus": "#5ae25f",
  "long": "#4325ec",
  "short": "#e968f5"
}

export function App() {
  const [cycle, setCycle] = useState<CycleType>('focus');
  const [pause, setPause] = useState<boolean>(true);
  const [targetTime, setTargetTime] = useState<Date>(() => {
    const agora = new Date();
    agora.setMinutes(agora.getMinutes() + 30);
    return agora;
  });
  const [cycleTime, setCycleTime] = useState<string>("30:00");
  const [timeLeft, setTimeLeft] = useState<number>(1800000);
  const [lastPause, setLastPause] = useState<CycleType>("long");

  const handleChangeCycle = useCallback((newCycle: CycleType) => {
    setCycle(newCycle);

    const agora = new Date();
    const target = new Date(agora.getTime());

    target.setMinutes(target.getMinutes() + CYCLE_DURATIONS[newCycle]);
    setTargetTime(target);
    setTimeLeft(CYCLE_DURATIONS[newCycle] * 60 * 1000);
    setCycleTime(`${CYCLE_DURATIONS[newCycle].toString().padStart(2, '0')}:00`);
    document.title = `${newCycle.charAt(0).toUpperCase() + newCycle.slice(1)} · ${CYCLE_DURATIONS[newCycle].toString().padStart(2, '0')}:00`
  }, [])

  const pauseTimer = () => {
    const agora = new Date();
    if (!pause) {
      setTimeLeft(targetTime.getTime() - agora.getTime());
    } else {
      const newTargetTime = new Date(agora.getTime() + timeLeft);
      setTargetTime(newTargetTime);
    }
    setPause(!pause);
  }

  const resetTimer = () => {
    handleChangeCycle(cycle);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const agora = new Date();
      const milliDiff = targetTime.getTime() - agora.getTime() + 1000;
      setTimeLeft(milliDiff);

      if (milliDiff <= 0) {
        clearInterval(interval);
        setCycleTime("00:00");
        if (cycle === "focus") {
          if (lastPause === "long") {
            handleChangeCycle("short");
            setLastPause("short")
          } else { 
            handleChangeCycle("long");
            setLastPause("long")
          }
        } else {
          handleChangeCycle("focus");
        }

        return;
      }

      const totalSeconds = milliDiff / 1000;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.floor(totalSeconds % 60);

      document.title = `${cycle.charAt(0).toUpperCase()+cycle.slice(1)} · ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

      setCycleTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    if (pause) {
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [cycle, handleChangeCycle, lastPause, pause, targetTime]);


  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center'
    }}>
      <ProgressBar
        style={{
          justifySelf: 'center',
          alignItems: 'center'
        }}
        percentage={(timeLeft / (CYCLE_DURATIONS[cycle]*60*1000)) * 100}
        radius={350}
        thickness={8}
        progresscolor={CYCLE_COLORS[cycle]}
      >
        <CycleSelection
          selected={cycle}
          changeCycle={handleChangeCycle}
        />
        <Timer time={cycleTime}/>
        <ControlButtons paused={pause} pauseButton={pauseTimer} resetButton={resetTimer}/>
      </ProgressBar>
    </div>
  )
}