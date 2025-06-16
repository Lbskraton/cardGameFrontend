import { useEffect, useState } from "react";

interface TemporizadorProps {
  tiempoInicial: number;
  AlAcabar: () => void;
}

const Temporizador = ({ tiempoInicial, AlAcabar }: TemporizadorProps) => {
  const [timeLeft, setTimeLeft] = useState(tiempoInicial);

  useEffect(() => {
    if (timeLeft <= 0) {
      AlAcabar();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev:number) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, AlAcabar]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return <div>Tiempo restante: {formatTime(timeLeft)}</div>;
};

export default Temporizador;