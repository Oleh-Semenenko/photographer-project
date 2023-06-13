export function formateDate (date, options) {
  return new Intl.DateTimeFormat('en-US', options).format(date)
}
