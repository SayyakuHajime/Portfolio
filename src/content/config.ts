import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    course: z.string().optional(),
    subject: z.string().optional(),
    exam: z.string().optional(),
    topics: z.array(z.string()).optional(),
    references: z.string().optional(),
    order: z.number().default(99),
    date: z.string().optional(),
  }),
});

export const collections = { notes };
