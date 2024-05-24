import { z } from "zod";
import { bloodGroupList } from "../../constants";

const bloodRequestSchema = z.object({
  donorId: z.string().optional(),
  bloodType: z.enum([...bloodGroupList as [string, ...string[]]], { required_error: 'Blood Type field is required' }),
  numberOfBag: z.number({ required_error: 'number of bag field is required' }).min(1, { message: 'number of bag must be greater than 0' }),
  phoneNumber: z.string({ required_error: 'phone number field is required' }),
  dateOfDonation: z.string({ required_error: 'date field is required' }),
  reason: z.string({ required_error: 'reason field is required' }),
});


const requestValidators = { bloodRequestSchema };
export default requestValidators;