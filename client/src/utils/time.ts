const fillZeros = ({ num, length }: { num: number; length: number }) => {
  const fixedNumStr = String(parseInt(String(num.toFixed(length))));
  return fixedNumStr.padStart(length, '0');
};

export const getSecondToMMSSFormat = (seconds: number) => {
  const min = (seconds % 3600) / 60;
  const sec = seconds % 60;
  const minFormat = fillZeros({ num: min, length: 2 });
  const secFormat = fillZeros({ num: sec, length: 2 });

  return `${minFormat}:${secFormat}`;
};

export const getDateYYYYMMDDHHMMFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;
  return formattedDate;
};

export const getLastWeekDate = () => {
  const d = new Date();
  const dayOfMonth = d.getDate();
  d.setDate(dayOfMonth - 7);
  return d;
};

export const getDateMMDDFormat = (date: Date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const formattedDate = `${month}.${day}`;
  return formattedDate;
};

export const getDateYYYYMMDDFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
