import md5 from "md5";

export const genAuthorizedQuery = () => {
  const currentDate = new Date();

  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getUTCDate()).padStart(2, "0");

  const formattedDate = `${year}${month}${day}`;

  return md5(`${import.meta.env.VITE_QUERY_PASSWORD}_${formattedDate}`);
};
