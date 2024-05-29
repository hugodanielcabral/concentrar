import { message } from "./utils/message";
import { triggerAudio } from "./utils/playAudio";
import {
  getTotalTimeObject,
  setTotalTimeLS,
  createResetButton,
} from "./utils/totalTime";

let $timer = document.getElementById("timer"),
  $startButton = document.getElementById("startButton") as HTMLButtonElement,
  $stopButton = document.getElementById("stopButton") as HTMLButtonElement,
  $resumeButton = document.getElementById("resumeButton") as HTMLButtonElement,
  $resetButton = document.getElementById("resetButton") as HTMLButtonElement,
  $totalTime = document.getElementById("totalTime") as HTMLElement;

let timeInMinutes = 1;
let timeInSeconds = 0;
let totalTimeInMinutes = 0;
let totalTimeInSeconds = 0;

let startIntervalId: number;
let totalTimeIntervalId: number;

const changeButtonVisibility = (btnValue: string) => {
  switch (btnValue) {
    case "start":
      $startButton?.classList.add("hiddenBtn");
      $stopButton?.classList.remove("hiddenBtn");
      $resetButton?.classList.remove("hiddenBtn");
      break;
    case "resume":
      $resumeButton?.classList.add("hiddenBtn");
      $stopButton?.classList.remove("hiddenBtn");
      break;
    case "stop":
      $resumeButton?.classList.remove("hiddenBtn");
      $stopButton?.classList.add("hiddenBtn");
      break;
    case "reset":
      $startButton?.classList.remove("hiddenBtn");
      $resumeButton?.classList.add("hiddenBtn");
      $stopButton?.classList.add("hiddenBtn");
      $resetButton?.classList.add("hiddenBtn");
      break;

    default:
      break;
  }
};

const startTimer = () => {
  startIntervalId = setInterval(() => {
    if (timeInSeconds === 0) {
      timeInMinutes = timeInMinutes - 1;
      timeInSeconds = 59;
    } else {
      timeInSeconds = timeInSeconds - 1;
    }

    if ($timer) {
      $timer.textContent = `${timeInMinutes
        .toString()
        .padStart(2, "0")}:${timeInSeconds.toString().padStart(2, "0")}`;

      document.title = $timer?.textContent;
    }

    notifyAndResetTimer();
  }, 1000);
};

const stopTimer = () => {
  clearInterval(startIntervalId);
};

const resetTimer = () => {
  clearInterval(startIntervalId);
  timeInMinutes = 1;
  timeInSeconds = 0;

  if ($timer) {
    $timer.textContent = `${timeInMinutes
      .toString()
      .padStart(2, "0")}:${timeInSeconds.toString().padStart(2, "0")}`;
  }
};

const startTotalTime = () => {
  totalTimeIntervalId = setInterval(() => {
    if (totalTimeInSeconds === 59) {
      totalTimeInMinutes = totalTimeInMinutes + 1;
      totalTimeInSeconds = 0;
      setTotalTimeLS(totalTimeInMinutes, totalTimeInSeconds);
    } else {
      totalTimeInSeconds = totalTimeInSeconds + 1;
      setTotalTimeLS(totalTimeInMinutes, totalTimeInSeconds);
    }

    if ($totalTime) {
      updateTotalTimeDisplay();
    }

    createResetButton(totalTimeInSeconds);
  }, 1000);
};

const stopTotalTime = () => {
  clearInterval(totalTimeIntervalId);
};

const notifyAndResetTimer = () => {
  if (timeInMinutes === 0 && timeInSeconds === 0) {
    triggerAudio();
    changeButtonVisibility("reset");
    resetTimer();
    stopTotalTime();
  }

  return;
};

const updateTotalTimeDisplay = () => {
  $totalTime.textContent = `${totalTimeInMinutes
    .toString()
    .padStart(2, "0")}:${totalTimeInSeconds.toString().padStart(2, "0")}`;
};

export const resetTotalTime = () => {
  totalTimeInMinutes = 0;
  totalTimeInSeconds = 0;
  setTotalTimeLS(totalTimeInMinutes, totalTimeInSeconds);
  updateTotalTimeDisplay();
};

$startButton?.addEventListener("click", (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  let startValue = value;
  resetTimer();
  startTimer();
  changeButtonVisibility(startValue);
  startTotalTime();
});

$stopButton?.addEventListener("click", (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  let stopValue = value;
  stopTimer();
  changeButtonVisibility(stopValue);
  stopTotalTime();
});

$resumeButton?.addEventListener("click", (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  let resumeValue = value;
  startTimer();
  changeButtonVisibility(resumeValue);
  startTotalTime();
});

$resetButton?.addEventListener("click", (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  let resetValue = value;
  resetTimer();
  changeButtonVisibility(resetValue);
  stopTotalTime();
});

document.addEventListener("DOMContentLoaded", () => {
  let totalTimeObject = getTotalTimeObject(
    totalTimeInMinutes,
    totalTimeInSeconds
  );

  totalTimeInMinutes = totalTimeObject.totalTimeInMinutes;
  totalTimeInSeconds = totalTimeObject.totalTimeInSeconds;

  updateTotalTimeDisplay();
});

document.addEventListener("DOMContentLoaded", () => {
  createResetButton(totalTimeInSeconds);
});

message();