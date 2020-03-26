export const scrollToAsync = (x, y) =>
  new Promise(resolve => {
    window.scrollTo(x, y)

    setTimeout(() => {
      resolve()
    }, 100)
  })

export const truncate = (str, num = 32) => {
  if (str.length <= num) {
    return str
  }

  return str.slice(0, num) + '...'
}
