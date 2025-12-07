const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "TH";
  switch (day % 10) {
    case 1:
      return "ST";
    case 2:
      return "ND";
    case 3:
      return "RD";
    default:
      return "TH";
  }
};

export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  const day = date.getDate();
  const year = date.getFullYear();

  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();

  const suffix = getOrdinalSuffix(day);

  return `${day}${suffix} ${month} ${year}`;
};
