const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Parts of a calendar date given as "YYYY-MM-DD". Gig dates are local to the venue,
 * so this never goes through the viewer's time zone.
 */
export function dateParts(isoDate: string) {
  const [y, m, d] = isoDate.slice(0, 10).split('-').map(Number);
  const weekday = DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  const month = MONTHS[m - 1];
  return { year: y, month, day: d, weekday, label: `${weekday}, ${month} ${d}` };
}
