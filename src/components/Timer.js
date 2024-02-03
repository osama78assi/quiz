import { useEffect, useState } from "react";

function Timer({ onTick, sec}) {
  const [seconds, setSeconds] = useState(sec);

  function stop() {
    setTimeout(() => {
      onTick({type: "tick"})
    }, 1000);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((secs) => {
        let newSec = secs - 1;
        if(newSec === 1) {
          clearInterval(timer);
          stop();
          return 0;
        } else {
          return newSec;
        }
      });

    }, 1000);
  }, [onTick]);
  return (
    <div className="timer">
      {Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")}
      :{(seconds % 60).toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;
