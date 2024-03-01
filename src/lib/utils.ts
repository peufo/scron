import dayjs from 'dayjs'

export function renderChronoTime(startAt: Date, endAt: Date): string {
  const time = dayjs(endAt.getTime() - startAt.getTime())
  return time.format('mm:ss.SSS').slice(0, -1)
}
