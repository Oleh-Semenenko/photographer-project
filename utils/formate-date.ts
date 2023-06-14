import type { IDateTimeFormatOptions } from '~/types/global.types'

export function formateDate (date: Date | string, options: IDateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-US', options).format(date as Date)
}
