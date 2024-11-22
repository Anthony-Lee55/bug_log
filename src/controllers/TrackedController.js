import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedService } from "../services/TrackedService";
import BaseController from "../utils/BaseController";


export class TrackedController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
  }

  async createTrackedBug(request, response, next) {
    try {
      const trackedBugData = request.body
      // const userInfo = request.userInfo
      // trackedBugData.creatorId = userInfo.id
      const trackedBug = await trackedService.createTrackedBug(trackedBugData)
      response.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }
}