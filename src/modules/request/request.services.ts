import { RequestStatus } from '@prisma/client';
import ConnectPrisma from '../ConnectPrisma';
import { IBloodRequest } from './request.interface';

class RequestServices extends ConnectPrisma {
  /**
   * donation Request
   */
  async createDonationRequest(userId: string, payload: IBloodRequest) {
    payload.requesterId = userId;

    const requestData = await this.prisma.request.create({ data: payload })

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        location: true,
        availability: true,
        userProfile: true,
      },
    });

    const result = {
      id: requestData.id,
      donorId: requestData.donorId,
      requesterId: requestData.requesterId,
      name: user?.name,
      bloodType: user?.bloodType,
      phoneNumber: requestData.phoneNumber,
      dateOfDonation: requestData.dateOfDonation,
      reason: requestData.reason,
      requestStatus: requestData.requestStatus,
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
  async getAllDonationRequest(query: Record<string, unknown>) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 9;
    const skip = (page - 1) * limit;


    const requests = await this.prisma.request.findMany({
      skip,
      take: limit,
      where: { requestStatus: 'PENDING' },
      include: {
        requester: {
          include: {
            userProfile: true,
          }
        }
      }
    });

    const total = await this.prisma.request.count({ where: { requestStatus: 'PENDING' } });

    return {
      data: requests,
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

}

const requestServices = new RequestServices();
export default requestServices;
