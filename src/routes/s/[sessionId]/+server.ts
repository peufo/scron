import { createSSE } from '$lib/server'
import { eventEmiter } from './eventEmiter'

export const GET = () => {
  const { readable, subscribe } = createSSE()

  subscribe(eventEmiter, 'create_chrono')
  subscribe(eventEmiter, 'stop_chrono')

  return new Response(readable, {
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'text/event-stream',
    },
  })
}
