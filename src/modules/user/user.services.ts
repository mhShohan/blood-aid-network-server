import { Prisma, RequestStatus, UserRole, UserStatus } from '@prisma/client';
import httpStatus from 'http-status';
import APIError from '../../errorHandler/APIError';
import generateToken from '../../utils/generateToken';
import hashPassword from '../../utils/hashPassword';
import verifyPassword from '../../utils/verifyPassword';
import ConnectPrisma from '../ConnectPrisma';
import { IDonarRequest, IUserProfile, IUserRegister } from './user.interfaces';
import { TBloodGroup } from '../../interfaces/common';
import { bloodGroupList } from '../../constants';
import bcrypt from 'bcrypt';

class UserServices extends ConnectPrisma {
  /**
   * register a new account
   */
  async register(payload: IUserRegister) {
    const existedUserWithUsername = await this.prisma.user.findFirst({ where: { username: payload.username }, });
    if (existedUserWithUsername) throw new APIError(httpStatus.CONFLICT, 'User Already exist with this username!');

    const existedUserWithEmail = await this.prisma.user.findFirst({ where: { email: payload.email }, });
    if (existedUserWithEmail) throw new APIError(httpStatus.CONFLICT, 'User Already exist with this email!');

    const hashedPassword = await hashPassword(payload.password);

    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: payload.name,
          username: payload.username,
          email: payload.email,
          password: hashedPassword,
          bloodType: payload.bloodType,
          location: payload.location,
        },
      });

      const userProfile = await tx.userProfile.create({
        data: {
          userId: user.id,
          dateOfBirth: payload.dateOfBirth,
          lastDonationDate: payload?.lastDonationDate,
        },
      });

      const token = generateToken({ id: user.id, email: user.email, role: user.role });

      return {
        token,
        userDate: {
          id: user.id,
          name: user.name,
          email: user.email,
          bloodType: user.bloodType,
          role: user.role,
          status: user.status,
          location: user.location,
          availability: user.availability,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          userProfile,
        }
      };
    });

    return result;
  }

  /**
   * login a new account
   */
  async login(payload: { usernameOrEmail: string; password: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: payload.usernameOrEmail },
          { username: payload.usernameOrEmail }
        ]
      }
    })

    if (!user) throw new APIError(400, 'Authentication failed!', 'WrongCredentials');

    await verifyPassword(payload.password, user.password);

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return { id: user.id, name: user.name, email: user.email, role: user.role, token };
  }

  /**
   * Get all donar
   */
  async getAllDonar(query: Record<string, unknown>) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const filterQuery: Prisma.UserWhereInput[] = [];

    if (query.searchTerm) {
      filterQuery.push({
        OR: ['name', 'email', 'location'].map((field) => ({
          [field]: {
            contains: query.searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }

    const bloodType = query.bloodType as TBloodGroup;

    if (bloodType && bloodGroupList.includes(bloodType)) {
      filterQuery.push({
        bloodType: { equals: bloodType as TBloodGroup },
      });
    }

    if (query.availability) {
      filterQuery.push({
        availability: { equals: query.availability === 'true' ? true : false },
      });
    }

    if (query.location) {
      filterQuery.push({
        location: { contains: query.location as string, mode: 'insensitive' },
      });
    }

    if (query.lastDonationDate) {
      filterQuery.push({
        userProfile: {
          lastDonationDate: { equals: query.lastDonationDate as string },
        }
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderBy: any = {};

    if (query.sortBy === 'name') {
      orderBy.name = query.sortOrder ? query.sortOrder : 'asc';
    } else if (query.sortBy === 'age') {
      orderBy.userProfile = {};
      orderBy.userProfile.age = query.sortOrder ? query.sortOrder : 'asc';
    } else if (query.sortBy === 'lastDonationDate') {
      orderBy.userProfile = {};
      orderBy.userProfile.lastDonationDate = query.sortOrder ? query.sortOrder : 'asc';
    } else {
      orderBy.createdAt = 'asc';
    }

    const data = await this.prisma.user.findMany({
      where: { AND: filterQuery },
      skip,
      take: limit,
      orderBy,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bloodType: true,
        location: true,
        availability: true,
        createdAt: true,
        updatedAt: true,
        userProfile: true,
      },
    });

    const total = await this.prisma.user.count({
      where: { AND: filterQuery },
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  /**
   * donation Request
   */
  async donationRequest(payload: IDonarRequest) {
    console.log(payload)
    // if (!payload.donorId && !payload.requesterId) throw new APIError(400, 'DonorId or RequesterId is required!');

    // const data = {
    //   donorId: payload.donorId,
    //   requesterId: payload.requesterId,
    //   phoneNumber: payload.phoneNumber,
    //   dateOfDonation: payload.dateOfDonation,
    // };

    // const requestData = await this.prisma.request.create({ data });
    // const id = requestData.donorId || requestData.requesterId
    // const user = await this.prisma.user.findUnique({
    //   where: { id: id! },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //     bloodType: true,
    //     location: true,
    //     availability: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     userProfile: true,
    //   },
    // });

    // const result = {
    //   id: requestData.id,
    //   donorId: requestData.donorId,
    //   requesterId: requestData.requesterId,
    //   name: user?.name,
    //   blood_type: user?.bloodType,
    //   phone_number: requestData.phoneNumber,
    //   date: requestData.dateOfDonation,
    //   reason: requestData.reason,
    //   request_status: requestData.requestStatus,
    //   createdAt: requestData.createdAt,
    //   updatedAt: requestData.updatedAt,
    //   donor: user,
    // };

    // return result;
  }

  /**
   * get single donor by id
   */
  async getSingleDonor(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
      include: { userProfile: true, donate: true, requestes: true }
    });
  }

  /**
   * get All Users (nly for admin)
   */
  async getAllUsers(query: Record<string, unknown>) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 20;
    const skip = (page - 1) * limit;


    const result = await this.prisma.user.findMany({
      skip,
      take: limit,
      include: { userProfile: true },
    });

    const total = await this.prisma.user.count();

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  /**
   * get donation Request
   */
  async getAllDonationRequest(id: string) {
    const donor = await this.prisma.user.findUnique({
      where: { id }, include: {
        donate: {
          where: { requestStatus: { not: { equals: RequestStatus.APPROVED } } },
          include: {
            requester: true
          }
        }
      }
    });
    return donor?.donate
  }

  /**
   * get donation Request
   */
  async getAllDonateHistory(id: string) {
    const donor = await this.prisma.user.findUnique({
      where: { id }, include: {
        donate: {
          where: { requestStatus: RequestStatus.APPROVED },
          include: {
            requester: true
          }
        }
      }
    });

    return donor?.donate
  }

  /**
   * Update donation request status
   */
  async updateDonationRequestStatus(id: string, payload: { status: RequestStatus }) {
    return this.prisma.request.update({ where: { id }, data: { requestStatus: payload.status } });
  }

  /**
   * update my profile
   */
  async updateProfile(id: string, payload: IUserProfile) {
    const { user, userProfile: { id: userProfileId, ...userProfile } } = payload;

    if (!userProfile.profilePicture) {
      delete userProfile.profilePicture
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({ where: { id }, data: user });
      const updatedProfile = await tx.userProfile.update({ where: { id: userProfileId }, data: userProfile });

      return { updatedUser, updatedProfile }
    })

    return result
  }

  /**
   * change password
   */
  async changePassword(id: string, payload: { oldPassword: string; newPassword: string }) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    const passwordMatched = await bcrypt.compare(payload.oldPassword, user?.password as string);
    if (!passwordMatched) throw new APIError(400, 'Old password is incorrect!');

    const password = await hashPassword(payload.newPassword);

    await this.prisma.user.update({ where: { id }, data: { password } })

    return
  }

  /**
   * Get my profile
   */
  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { userProfile: true },
    });

    if (!user) throw new APIError(404, 'No user found!');

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      username: user?.username,
      status: user?.status,
      role: user?.role,
      availability: user?.availability,
      bloodType: user?.bloodType,
      location: user?.location,
      bio: user?.userProfile?.bio,
      dateOfBirth: user?.userProfile?.dateOfBirth,
      lastDonationDate: user?.userProfile?.lastDonationDate,
      userProfile: user?.userProfile,
    };
  }

  /**
   * update user role
   */
  async updateRole(id: string, payload: { role: UserRole }) {
    return this.prisma.user.update({ where: { id }, data: { role: payload.role } });
  }

  /**
   * update user role
   */
  async updateStatus(id: string, payload: { status: UserStatus }) {
    return this.prisma.user.update({ where: { id }, data: { status: payload.status } });
  }
}

const userServices = new UserServices();
export default userServices;
