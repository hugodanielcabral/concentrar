import { resetTotalTime } from "../main";

let $totalTimeContainer = document.getElementById(
  "totalTimeContainer"
) as HTMLDivElement;

export const setTotalTimeLS = (minutes: number, seconds: number) => {
  localStorage.setItem(
    "lsTotalTime",
    JSON.stringify({
      totalTimeInMinutes: minutes,
      totalTimeInSeconds: seconds,
    })
  );
};

export const getTotalTimeObject = (
  totalTimeInMinutes: number,
  totalTimeInSeconds: number
) => {
  let lsTotalTimeInMinutes = localStorage.getItem("lsTotalTime");

  if (lsTotalTimeInMinutes) {
    return JSON.parse(lsTotalTimeInMinutes);
  } else {
    let totalTimeObject = { totalTimeInMinutes, totalTimeInSeconds };
    localStorage.setItem("lsTotalTime", JSON.stringify(totalTimeObject));
    return totalTimeObject;
  }
};

export const createResetButton = (totalTimeInSeconds: number) => {
  let existingButton = document.getElementById("resetTotalTime");
  if (existingButton) return;

  if (totalTimeInSeconds !== 0) {
    $totalTimeContainer.insertAdjacentHTML(
      "afterend",
      `
      <button type='button' class='resetTotalTime' id='resetTotalTime'>
        X
      </button>
    `
    );
  }
  let resetButton = document.getElementById("resetTotalTime");
  resetButton?.addEventListener("click", resetTotalTime);
};
