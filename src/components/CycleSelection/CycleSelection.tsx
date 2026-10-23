import styles from './CycleSelection.module.css';

export type CycleType = 'focus' | 'short' | 'long';

type CycleSelectionProps = {
    selected: 'focus' | 'short' | 'long';
    changeCycle: (cycle: CycleType) => void;
}

function CycleSelection({
    selected='focus',
    changeCycle
}: CycleSelectionProps) {
    
    return (
        <div className={styles.CycleSelectionPropsDiv}>
            <button className={`${styles.cycleButton} ${selected === 'focus' ? styles.cycleSelected : ''}`} onClick={() => changeCycle('focus')}>FOCUS</button>
            <button className={`${styles.cycleButton} ${selected === 'short' ? styles.cycleSelected : ''}`} onClick={() => changeCycle('short')}>SHORT BREAK</button>
            <button className={`${styles.cycleButton} ${selected === 'long' ? styles.cycleSelected : ''}`} onClick={() => changeCycle('long')}>LONG BREAK</button>
        </div>
    )
}

export default CycleSelection;