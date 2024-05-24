import { BloodType } from "@prisma/client";

export interface IBloodRequest {
  donorId: string;
  requesterId: string;
  name: string;
  bloodType: BloodType;
  phoneNumber: string;
  dateOfDonation: string;
  numberOfBag: number;
  reason: string;
}
