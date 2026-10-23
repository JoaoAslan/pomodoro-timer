import './styles/global.css';
import ProgressBar from './components/ProgressBar/ProgressBar.tsx';
import CycleSelection, {type CycleType} from './components/CycleSelection/CycleSelection.tsx';
import Timer from './components/Timer/Timer.tsx';
import { useEffect, useState } from 'react';

export function App() {

  const [cycle, setCycle] = useState<CycleType>('focus');
  const [time, setTime] = useState<Date>(new Date('2026-10-23T00:30:00'));

  

  const handleChangeCycle = (newCycle: CycleType) => {
    setCycle(newCycle);

    if (newCycle === 'focus') {
      setTime(new Date('2026-10-23T00:30:00'));
    }
    
    if (newCycle === 'short') {
      setTime(new Date('2026-10-23T00:05:00'));
    }

    if (newCycle === 'long') {
      setTime(new Date('2026-10-23T00:15:00'));
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setTime((time) => new Date(time.getTime() - 1000));
    }, 1000);
  }, [time]);

  
  const timeFormatted: string = time.toLocaleTimeString('pt-BR', {
    minute: '2-digit',
    second: '2-digit'
  });

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
        percentage={3}
        radius={350}
        thickness={8}
      >
        <CycleSelection
          selected={cycle}
          changeCycle={handleChangeCycle}
        />
        <Timer time={timeFormatted}/>
      </ProgressBar>
    </div>
  )
}