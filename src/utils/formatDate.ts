export const formatDateToLocalDateTime = (date) => {
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

export const formatToLocalDateTime = (date: Date, time: string) => {
  return `${date.toISOString().split("T")[0]}T${time}:00`;
};
