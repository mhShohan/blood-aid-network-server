import { z } from 'zod';
import { bloodGroupList } from '../../constants';

const registerSchema = z.object({
  name: z.string({ required_error: 'Name field is required' }),
  username: z.string({ required_error: 'Username field is required' }),
  email: z
    .string({ required_error: 'Email field is required' })
    .email({ message: 'Must provide a valid email address' }),
  password: z
    .string({ required_error: 'Password field is required' })
    .min(6, { message: 'Password must have 6 characters' }),
  bloodType: z.enum([...bloodGroupList as [string, ...string[]]], { required_error: 'Blood Type field is required' }),
  location: z.string({ required_error: 'Location field is required' }),
  dateOfBirth: z
    .string({
      required_error: 'Date Of Birth field is required',
    }),
  lastDonationDate: z.string({ required_error: 'Last Donation Date field is required' }),
});

const loginSchema = z.object({
  usernameOrEmail: z.string({ required_error: 'usernameOrEmail field is required' }),
  password: z
    .string({ required_error: 'Password field is required' })
    .min(6, { message: 'Password must have 6 characters' }),
});

const donationSchema = z.object({
  donorId: z.string({ required_error: 'donorId field is required' }).optional(),
  requesterId: z.string({ required_error: 'requesterId field is required' }).optional(),
  name: z.string({ required_error: 'Name field is required' }),
  blood_type: z.string({ required_error: 'blood_type field is required' }),
  phone_number: z.string({ required_error: 'phone_number field is required' }),
  date: z.string({ required_error: 'date field is required' }),
  hospital_name: z.string({ required_error: 'hospital_name field is required' }),
  hospital_address: z.string({ required_error: 'hospital_address field is required' }),
  reason: z.string({ required_error: 'reason field is required' }),
});

const updateDonationStatusSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED'], {
    required_error: 'Status failed is required',
  }),
});

const updateUserSchema = z.object({
  user: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    username: z.string().optional(),
    bloodType: z.enum(bloodGroupList as [string, ...string[]]).optional(),
    location: z.string().optional(),
    availability: z.boolean().optional(),
  }).optional(),
  userProfile: z.object({
    id: z.string().optional(),
    bio: z.string().optional(),
    profilePicture: z.string().optional(),
    dateOfBirth: z.string().optional(),
    lastDonationDate: z.string().optional(),
  }).optional(),
});

const changePasswordSchema = z.object({
  oldPassword: z.string({ required_error: 'Old Password field is required' }),
  newPassword: z
    .string({ required_error: 'New Password field is required' })
    .min(6, { message: 'Password must have 6 characters' }),
});

const authValidator = {
  registerSchema,
  loginSchema,
  donationSchema,
  updateDonationStatusSchema,
  changePasswordSchema,
  updateUserSchema
};
export default authValidator;
