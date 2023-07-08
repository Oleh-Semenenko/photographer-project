export interface IOrder {
  id?: number | null
  user_id: string | null
  client_phone: string | null
  client_name: string | null
  client_email: string | null
  photoType: string | undefined
  date: Date | string
  time: string[] | []
  comment: string | null
  confirmation?: string | null
}

export interface ICategory {
  id: number
  title: string
  color: string
}

export interface IUsersFetch {
  page?: number
  perPage?: number
  minPrice?: string
  maxPrice?: string
  categories?: string[]
  freeDay?: string | Date
  city?: string
  userId?: string
}

export interface IPromotionType {
  id: number
  duration: string
  cost: string
  views: string
  speedOfOrders: string
  reviews: string
}

export interface IColumn {
  value: string
  label: string
  width: string
}

export interface IPhotoTypes {
  [key: number]: {
    cost: string
    description?: string
    isChecked?: boolean
    photos: []
  }
}

export interface IPhoto {
  status: string
  uid: number
  url: string
}

export interface IDateTimeFormatOptions {
  localeMatcher?: 'lookup' | 'best fit'
  weekday?: 'narrow' | 'short' | 'long'
  era?: 'narrow' | 'short' | 'long'
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  second?: 'numeric' | '2-digit'
  timeZoneName?: 'short' | 'long'
  formatMatcher?: 'basic'
}

export interface IMetaData {
  avatarUrl?: string
  phoneNumber?: string
  about?: string
  city?: string
  first_name?: string
  second_name?: string
  promotion?: {cost: string; duration: string; id: number}
  photoTypes?: IPhotoTypes
  weekend?: string[]
}

export interface IFormModel {
  [key: string]: string
}
