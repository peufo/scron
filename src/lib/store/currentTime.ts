import { readable } from 'svelte/store'

export const currentTime = readable(new Date(), (set) => {
  const setCurrentTime = () => set(new Date())
  const interval = setInterval(setCurrentTime, 40)
  return () => {
    clearInterval(interval)
  }
})
