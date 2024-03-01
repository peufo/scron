import zod from 'zod'
import { type ZodObj } from './types'
import type { Prisma } from '@prisma/client'

export const modelSession = {
  name: zod.string(),
} satisfies ZodObj<Prisma.SessionCreateInput>
