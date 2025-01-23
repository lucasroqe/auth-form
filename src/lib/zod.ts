import { z } from "zod";

const schema = z.object({
    email: z.string().email('Enter a valid email address').nonempty('Email is required'),
    password: z.string().min(3, 'Password must be at least 3 characters').nonempty('Password is required'),
  })

export {schema}