import styles from './ControlButtons.module.css'

type ControlButtonsProps = {
    paused: boolean;
    pauseButton: () => void;
    resetButton: () => void;
}

function ControlButtons({
    paused,
    pauseButton,
    resetButton
}: ControlButtonsProps) {
    return (
        <div className={styles.buttonBox}>
            <button className={`${styles.pause} ${(!paused ? styles.paused : "")}`} onClick={() => pauseButton()}>{(paused) ? (<span className="material-symbols-outlined">play_arrow</span>) : (<span className="material-symbols-outlined">pause</span>)}</button>
            <button className={styles.reset} onClick={() => resetButton()}><span className="material-symbols-outlined">refresh</span></button>
        </div>
    )
}

export default ControlButtons;