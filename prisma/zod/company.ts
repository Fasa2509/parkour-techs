import * as z from "zod"
import { CompleteSession, relatedSessionSchema, CompleteWorker, relatedWorkerSchema } from "./index"

export const companySchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  direction: z.string(),
  createdAt: z.date().nullish(),
  emailVerified: z.date().nullish(),
  password: z.string(),
})

export interface CompleteCompany extends z.infer<typeof companySchema> {
  sessions: CompleteSession[]
  workers: CompleteWorker[]
}

/**
 * relatedCompanySchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCompanySchema: z.ZodSchema<CompleteCompany> = z.lazy(() => companySchema.extend({
  sessions: relatedSessionSchema.array(),
  workers: relatedWorkerSchema.array(),
}))
