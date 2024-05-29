import { resetTotalTime } from "../main";

let $totalTimeDisplayContainer = document.getElementById(
  "totalTimeDisplayContainer"
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
    $totalTimeDisplayContainer.insertAdjacentHTML(
      "beforeend",
      `
      <button type='button' class='resetTotalTime btn btn-outline-danger btn-sm px-1 py-0' id='resetTotalTime'>
        X
      </button>
    `
    );
  }
  let resetButton = document.getElementById("resetTotalTime");
  resetButton?.addEventListener("click", () => {
    resetTotalTime();
    resetButton.remove();
  });
};
