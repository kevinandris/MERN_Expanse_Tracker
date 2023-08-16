// ! 17 -- for the date
import moment from 'moment'

export const dateFormat = (date) => {
    return moment(date).format('DD/MM/YYYY')
}