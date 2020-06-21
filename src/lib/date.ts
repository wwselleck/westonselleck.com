// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
export function timeSince(date: Date) {
  const timeStamp = date.getTime();
  const now = new Date();
  const secondsPast = (now.getTime() - timeStamp) / 1000;

  if (secondsPast < 60) {
    return secondsPast + " seconds ago";
  }
  if (secondsPast < 3600) {
    return Math.round(secondsPast / 60) + " minutes ago";
  }
  if (secondsPast <= 86400) {
    return Math.round(secondsPast / 3600) + " hours ago";
  }
  if (secondsPast <= 2592000) {
    return Math.round(secondsPast / 86400) + " days ago";
  }

  let day = date.getDate();
  let month = date
    .toDateString()
    .match(/ [a-zA-Z]*/)[0]
    .replace(" ", "");
  let year =
    date.getFullYear() == now.getFullYear() ? "" : " " + date.getFullYear();
  return day + " " + month + year;
}
