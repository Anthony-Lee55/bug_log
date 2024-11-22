import { dbContext } from "../db/DbContext"
import { logger } from "../utils/Logger.js"

class TrackedService {
  async createTrackedBug(trackedBugData) {
    const trackedBug = await dbContext.TrackedBug.create(trackedBugData)
    await trackedBug.populate('tracker')
    await trackedBug.populate('bug')
    return trackedBug
  }

  async getUsersTracking(bugId, userId) {
    const user = await dbContext.TrackedBug.find({ bugId: bugId }).populate('tracker')
    if (userId == null) throw new Error(`Get away from ${bugId}`)
    return user
  }

  async getMyBugs(userId) {
    logger.log(userId)
    const myBug = await dbContext.TrackedBug.find({ accountId: userId })
    return myBug
  }
}

export const trackedService = new TrackedService()