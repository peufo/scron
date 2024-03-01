import zod from 'zod'
import { type ZodObj } from './types'
import type { Prisma } from '@prisma/client'

export const modelChrono = {
  startAt: zod.coerce.date(),
  name: zod.string().min(2),
} satisfies ZodObj<Prisma.ChronoCreateWithoutSessionInput>
