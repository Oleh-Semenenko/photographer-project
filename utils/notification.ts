export const successNotification = (message = 'Successful action') => {
  ElNotification({
    title: 'Success',
    message,
    type: 'success',
    duration: 2000
  })
}

export const errorNotification = (message = 'Something goes wrong') => {
  ElNotification({
    title: 'Error',
    message,
    type: 'error',
    duration: 2000
  })
}
