import styles from './TImer.module.css'

type TimerProps = {
    time: string
}

function Timer({
    time
}: TimerProps) {
    return (
        <>
            <h1 className={styles.TimerH1}>{time}</h1>
        </>
    )
}

export default Timer;