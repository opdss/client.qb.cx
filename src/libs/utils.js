import { Notify } from 'quasar'

export const errorMsg = function (str) {
  Notify.create({
    message: str,
    position: 'top',
    icon: 'error_outline',
    color: 'red'
  })
}

export const successMsg = function (str) {
  Notify.create({
    message: str,
    position: 'top',
    icon: 'check'
  })
}
