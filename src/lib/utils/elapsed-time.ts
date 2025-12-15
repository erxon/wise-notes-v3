export default function elapsedTime(date: string) {
  const endTime = new Date(date);
  const currentTime = Date.now();

  const elapsedMs = currentTime - endTime.getTime();

  const elapsedSeconds = elapsedMs / 1000;
  const elapsedMinutes = elapsedSeconds / 60;
  const elapsedHours = elapsedMinutes / 60;

  if (elapsedHours >= 24)
    return `${Math.round(elapsedHours / 24)} ${
      Math.round(elapsedHours / 24) === 1 ? "day" : "days"
    } ago`;

  if (elapsedHours >= 1) {
    if (Math.round(elapsedHours) === 1) {
      return "An hour ago";
    }
    return `${Math.round(elapsedHours)} hours ago`;
  }

  if (elapsedMinutes >= 1)
    return `${Math.round(elapsedMinutes)} ${
      Math.round(elapsedMinutes) === 1 ? "min" : "mins"
    } ago`;

  if (elapsedSeconds >= 1)
    return `${Math.round(elapsedSeconds)} ${
      Math.round(elapsedSeconds) === 1 ? "sec" : "secs"
    } ago`;

  return "just now";
}
