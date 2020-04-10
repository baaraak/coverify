export const scrollToAsync = (x: number, y: number) =>
  new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).window.scrollTo(x, y)

    setTimeout(() => {
      resolve()
    }, 100)
  })

export const truncate = (str = '', num = 32) => {
  if (str.length <= num) {
    return str
  }

  return str.slice(0, num) + '...'
}
