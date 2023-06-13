import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  theme: {
    extend: {
      colors: {
        'background-color': '#F5F5F5',
        'green-100': '#375F47',
        'green-80': '#6D967A',
        'green-60': '#B9DEC5',
        'green-40': '#E0F3E6',
        'white-100': '#FFFFFF',
        'white-50': '#F8F4F1',
        'black-100': '#010101',
        'black-80': '#2F2D2C',
        'grey-100': '#5B5B5B',
        'grey-50': '#EAEAEA',
        'grey-10': '#F6F6F6',
        red: '#E46F56',
        'yellow-100': '#FCF196',
        wedding: '#EBE8FC',
        'love-story': '#FCEAE9',
        individual: '#FFECDA',
        family: '#FDF8D4',
        fashion: '#E7D6F0',
        pets: '#FDFCE9',
        interior: '#E9F5F2',
        business: '#F4F0E6',
        tfp: '#EEF4E8',
        'model-tests': '#E7F6F6',
        product: '#E4E9FD',
        reportage: '#EDF5D7'
      }
    },
    fontFamily: {
      serif: ['"Merriweather Sans"', 'serif']
    }
  }
}
