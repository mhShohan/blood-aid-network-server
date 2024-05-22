import { bloodGroup } from "../../constants";

export interface IUserRegister {
  name: string;
  username: string;
  email: string;
  password: string;
  bloodType: keyof typeof bloodGroup;
  location: string;
  dateOfBirth: string;
  bio: string;
  lastDonationDate: string;
}

export interface IDonarRequest {
  donorId: string;
  requesterId: string;
  name: string;
  blood_type: string;
  phone_number: string;
  date: string;
  hospital_name: string;
  hospital_address: string;
  reason: string;
}
