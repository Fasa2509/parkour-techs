import * as z from "zod"
import { STATUS } from "@prisma/client"
import { CompleteCompany, relatedCompanySchema } from "./index"

export const workerSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  ci: z.number().int(),
  phone: z.string(),
  direction: z.string(),
  salary: z.number().int(),
  hours: z.number().int(),
  status: z.nativeEnum(STATUS),
  createdAt: z.date().nullish(),
  companyId: z.string(),
})

export interface CompleteWorker extends z.infer<typeof workerSchema> {
  company: CompleteCompany
}

/**
 * relatedWorkerSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedWorkerSchema: z.ZodSchema<CompleteWorker> = z.lazy(() => workerSchema.extend({
  company: relatedCompanySchema,
}))
