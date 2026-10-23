import React, { type ReactNode } from 'react';
import styles from './ProgressBar.module.css';

type ProgressBarProps = {
    percentage: number;
    radius: number;
    thickness: number;
    direction?: 'clockwise' | 'counterclockwise',
    progresscolor?: string;
    backgroundcolor?: string;
    start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    className?: string;
    style?: React.CSSProperties;

    children?: ReactNode;
}

function ProgressBar({
    percentage, 
    radius, 
    thickness,
    direction="clockwise",
    progresscolor = "#5ae25f", 
    backgroundcolor = "#f5f5f5", 
    start = 12,

    className="",
    style,
    children
}: ProgressBarProps) {
    
    const normalizedRadius = radius - thickness;
    const circumference = normalizedRadius * 2 * Math.PI;
    const baseOffset = circumference - (percentage / 100) * circumference;
    const strokeDashoffset = direction === "counterclockwise" ? -baseOffset : baseOffset;
    
    const rotation = (start * 30) - 90;

    return (
        <div className={`${styles.progressBarDiv} ${className}`} style={style}>
            <svg
                className={styles.progressSvg}
                width={radius * 2}
                height={radius * 2}
                /* A rotação agora muda conforme a prop 'start' */
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                <circle
                    className={styles.backgroundCircle}
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius} 
                    fill="none" 
                    stroke={backgroundcolor} 
                    strokeWidth={thickness}
                />
                <circle
                    className={styles.progressCircle} 
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius} 
                    fill="none" 
                    stroke={progresscolor} 
                    strokeWidth={thickness} 
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffset
                    }}
                />
            </svg>
            {children && (
                <div className={styles.progressBarChildrenContent}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default ProgressBar;