import { BloodType } from "@prisma/client";
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
  bloodType: BloodType;
  phoneNumber: string;
  dateOfDonation: string;
  numberOfBag: number;
  reason: string;
}
