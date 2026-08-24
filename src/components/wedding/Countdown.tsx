"use client";

import React, { useState, useEffect } from "react";
import styles from "@/css/countdown.module.css";

interface CountdownProps {
  targetDate?: string; // Formato ISO, ej: "2026-11-20T18:00:00"
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({
  targetDate = "2026-11-20T18:00:00",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Falta muy poco</h2>
      <div className={styles.timer}>
        <div className={styles.unit}>
          <span className={styles.number}>{timeLeft.days}</span>
          <span className={styles.label}>Días</span>
        </div>
        <div className={styles.unit}>
          <span className={styles.number}>{timeLeft.hours}</span>
          <span className={styles.label}>Hs</span>
        </div>
        <div className={styles.unit}>
          <span className={styles.number}>{timeLeft.minutes}</span>
          <span className={styles.label}>Min</span>
        </div>
        <div className={styles.unit}>
          <span className={styles.number}>{timeLeft.seconds}</span>
          <span className={styles.label}>Seg</span>
        </div>
      </div>
    </section>
  );
}