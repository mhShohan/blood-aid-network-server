import { z } from "zod";

const bloodRequestSchema = z.object({
  donorId: z.string().optional(),
  requesterId: z.string().optional(),
  bloodType: z.string({ required_error: 'blood type field is required' }),
  phoneNumber: z.string({ required_error: 'phone number field is required' }),
  date: z.string({ required_error: 'date field is required' }),
  numberOfBag: z.number({ required_error: 'number of bag field is required' }).min(1, { message: 'number of bag must be greater than 0' }),
  reason: z.string({ required_error: 'reason field is required' }),
});


const requestValidators = { bloodRequestSchema };
export default requestValidators;