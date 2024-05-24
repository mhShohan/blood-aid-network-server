import httpStatus from 'http-status';
import asyncHandler from '../../lib/asyncHandler';
import sendResponse from '../../lib/sendResponse';
import requestServices from './request.services';

class RequestControllers {
  private services = requestServices;

  /**
   * Create a donation request
   */
  createDonationRequest = asyncHandler(async (req, res) => {
    const result = await this.services.createDonationRequest(req.user.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Blood Request are successfully made!',
      success: true,
      data: result,
    });
  });

  /**
   * Get all Donation Request
   */
  getAllDonationRequest = asyncHandler(async (req, res) => {
    const result = await this.services.getAllDonationRequest(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Donation requests retrieved successfully',
      success: true,
      meta: result.meta,
      data: result.data,
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


}

const requestControllers = new RequestControllers();
export default requestControllers;
