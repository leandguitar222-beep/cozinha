
import React, { useState, useEffect, useCallback } from 'react';
import { IconTimer } from './Icons';

interface TimerProps {
  seconds: number;
}

const Timer: React.FC<TimerProps> = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      // Optional: Play a sound or notification
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(seconds);
  };

  return (
    <div className="flex items-center gap-4 bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl border border-orange-200 dark:border-orange-800">
      <IconTimer className="text-orange-600" />
      <span className="text-2xl font-bold font-mono text-orange-700 dark:text-orange-400">
        {formatTime(timeLeft)}
      </span>
      <div className="flex gap-2">
        <button
          onClick={toggle}
          className={`px-4 py-1 rounded-lg text-sm font-semibold transition-colors ${
            isActive ? 'bg-orange-600 text-white' : 'bg-orange-200 text-orange-700 hover:bg-orange-300'
          }`}
        >
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          onClick={reset}
          className="px-4 py-1 rounded-lg text-sm font-semibold bg-white border border-orange-200 text-orange-700 hover:bg-orange-50"
        >
          Resetar
        </button>
      </div>
    </div>
  );
};

export default Timer;
