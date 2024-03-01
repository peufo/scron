import { modelChrono } from '$lib/model/chrono'
import { parseFormData, prisma } from '$lib/server'
import zod from 'zod'

export const load = async ({ params: { sessionId } }) => ({
  session: await prisma.session.findUniqueOrThrow({
    where: { id: sessionId },
    include: { chronos: true },
  }),
})

export const actions = {
  create_chrono: async ({ request, params: { sessionId } }) => {
    const { err, data } = await parseFormData(request, modelChrono)
    if (err) return err
    return await prisma.chrono.create({
      data: {
        ...data,
        sessionId,
      },
    })
  },
  stop_chrono: async ({ request }) => {
    const { err, data } = await parseFormData(request, {
      id: zod.string(),
      endAt: zod.coerce.date(),
    })
    if (err) return err
    return await prisma.chrono.update({
      where: { id: data.id },
      data: { endAt: data.endAt },
    })
  },
}
