export const formatDateDDMMYYYY = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getDate = () => {
  const today = new Date();
  return today;
};

export const getDayMinusDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const formatForDateInput = (isoString) => {
  if (!isoString) return "";
  return isoString.slice(0, 10); // yyyy-MM-dd
};

export const toInputDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // convert ngược từ dd-MM-yyyy -> yyyy-MM-dd
};
