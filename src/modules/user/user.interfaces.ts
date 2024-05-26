import { BloodType } from "@prisma/client";
import { bloodGroup } from "../../constants";
import { TBloodGroup } from "../../interfaces/common";

export interface IUserRegister {
  name: string;
  username: string;
  email: string;
  password: string;
  bloodType: keyof typeof bloodGroup;
  location: string;
  dateOfBirth: string;
  bio: string;
  lastDonationDate?: string;
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



export interface IUserProfile {
  user: {
    name?: string;
    email?: string;
    username?: string;
    bloodType?: TBloodGroup;
    location?: string;
    availability?: boolean;
  };
  userProfile: {
    id?: string;
    bio?: string;
    profilePicture?: string;
    dateOfBirth?: string;
    lastDonationDate?: string;
  };
}