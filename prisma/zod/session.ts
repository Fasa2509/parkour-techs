import * as z from "zod"
import { CompleteCompany, relatedCompanySchema } from "./index"

export const sessionSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  companyId: z.string(),
  expires: z.date(),
})

export interface CompleteSession extends z.infer<typeof sessionSchema> {
  company: CompleteCompany
}

/**
 * relatedSessionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSessionSchema: z.ZodSchema<CompleteSession> = z.lazy(() => sessionSchema.extend({
  company: relatedCompanySchema,
}))
