export function getDate(date: Date): string {
  let dateObj = new Date(date);
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let newDate = day + '-' + (month< 10?'0'+month:month) + '-' +  year ;
  return newDate;
}
