import { z } from "zod";

export namespace projectSchema {
  export const schema = z.object({
    id: z.number(),
    name: z.string().max(50),
    url: z.string().url().max(100),
    description: z.string().max(200),
    stack_name: z.enum(["Back-end", "Front-end", "Full-stack"]),
    highlight: z.boolean().optional().default(false),
  });
}
