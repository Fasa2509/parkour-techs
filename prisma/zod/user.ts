import * as z from "zod"
import { CompleteAccount, relatedAccountSchema, CompleteSession, relatedSessionSchema, CompleteWorker, relatedWorkerSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  direction: z.string().nullish(),
  createdAt: z.date().nullish(),
  emailVerified: z.date().nullish(),
  password: z.string(),
  image: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  workers: CompleteWorker[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  accounts: relatedAccountSchema.array(),
  sessions: relatedSessionSchema.array(),
  workers: relatedWorkerSchema.array(),
}))
