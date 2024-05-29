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
