const dateFormatter = (isoDate) => {
   const date = new Date(isoDate);

   const readableDate = date.toLocaleString("tr-TR", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
   });
   return readableDate
}
export default dateFormatter