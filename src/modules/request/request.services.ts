import { RequestStatus } from '@prisma/client';
import APIError from '../../errorHandler/APIError';
import ConnectPrisma from '../ConnectPrisma';
import { IDonarRequest } from '../user/user.interfaces';

class RequestServices extends ConnectPrisma {
  /**
   * donation Request
   */
  async donationRequest(payload: IDonarRequest) {
    if (!payload.donorId && !payload.requesterId) throw new APIError(400, 'DonorId or RequesterId is required!');

    const data = {
      donorId: payload.donorId,
      requesterId: payload.requesterId,
      phoneNumber: payload.phone_number,
      dateOfDonation: payload.date,
      hospitalName: payload.hospital_name,
      hospitalAddress: payload.hospital_address,
      reason: payload.reason,
    };

    const requestData = await this.prisma.request.create({ data });
    const id = requestData.donorId || requestData.requesterId
    const user = await this.prisma.user.findUnique({
      where: { id: id! },
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        location: true,
        availability: true,
        createdAt: true,
        updatedAt: true,
        userProfile: true,
      },
    });

    const result = {
      id: requestData.id,
      donorId: requestData.donorId,
      requesterId: requestData.requesterId,
      name: user?.name,
      blood_type: user?.bloodType,
      phone_number: requestData.phoneNumber,
      date: requestData.dateOfDonation,
      hospital_name: requestData.hospitalName,
      hospital_address: requestData.hospitalAddress,
      reason: requestData.reason,
      request_status: requestData.requestStatus,
      createdAt: requestData.createdAt,
      updatedAt: requestData.updatedAt,
      donor: user,
    };

    return result;
  }

  /**
   * Update donation request status
   */
  async updateDonationRequestStatus(id: string, payload: { status: RequestStatus }) {
    return this.prisma.request.update({ where: { id }, data: { requestStatus: payload.status } });
  }

  /**
   * get donation Request
   */
  async getAllDonationRequest(id: string) {
    return this.prisma.request.findMany({ where: { donorId: id }, include: { requester: true } });
  }

}

const requestServices = new RequestServices();
export default requestServices;
