import httpStatus from 'http-status';
import asyncHandler from '../../lib/asyncHandler';
import sendResponse from '../../lib/sendResponse';
import userServices from './user.services';

class UserControllers {
  private services = userServices;

  /**
   * register a new account
   */
  register = asyncHandler(async (req, res) => {
    const result = await this.services.register(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'User Registered successfully!',
      success: true,
      data: result,
    });
  });

  /**
   * login into account
   */
  login = asyncHandler(async (req, res) => {
    const result = await this.services.login(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'User logged in successfully!',
      success: true,
      data: result,
    });
  });

  /**
   * Get all donar with search, filter an pagination
   */
  getAllDonar = asyncHandler(async (req, res) => {
    const result = await this.services.getAllDonar(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Donors successfully found!',
      success: true,
      meta: result.meta,
      data: result.data,
    });
  });


  /**
   * Get donor with id
   */
  getSingleDonor = asyncHandler(async (req, res) => {
    const result = await this.services.getSingleDonor(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Donors successfully found!',
      success: true,
      data: result
    });
  });

  /**
   * Create a donation request
   */
  donationRequest = asyncHandler(async (req, res) => {
    const result = await this.services.donationRequest(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Request successfully made!',
      success: true,
      data: result,
    });
  });

  /**
   * Get all Donation Request
   */
  getAllDonationRequest = asyncHandler(async (req, res) => {
    const result = await this.services.getAllDonationRequest(req.user.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Donation requests retrieved successfully',
      success: true,
      data: result,
    });
  });

  /**
   * Update Donation request status
   */
  updateDonationRequestStatus = asyncHandler(async (req, res) => {
    const result = await this.services.updateDonationRequestStatus(req.params.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Donation request status successfully updated',
      success: true,
      data: result,
    });
  });

  /**
   * Get My profile
   */
  getProfile = asyncHandler(async (req, res) => {
    const result = await this.services.getProfile(req.user.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Profile retrieved successfully',
      success: true,
      data: result,
    });
  });

  /**
   * update My profile
   */
  updateProfile = asyncHandler(async (req, res) => {
    const result = await this.services.updateProfile(req.params.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Profile retrieved successfully',
      success: true,
      data: result,
    });
  });
}

const userControllers = new UserControllers();
export default userControllers;
