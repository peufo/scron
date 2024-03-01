import { modelSession } from '$lib/model'
import { parseFormData, prisma, tryOrFail } from '$lib/server'
import { redirect } from '@sveltejs/kit'

export const load = async () => ({
  sessions: await prisma.session.findMany(),
})

export const actions = {
  create_session: async ({ request }) => {
    return tryOrFail(
      async () => {
        const { err, data } = await parseFormData(request, modelSession)
        if (err) return err

        const session = await prisma.session.create({ data })
        return session
      },
      (s) => `/s/${s.id}`
    )
  },
}
