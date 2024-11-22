import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";


class BugsService {


  async createBug(bugData) {
    const bug = await dbContext.Bug.create(bugData)
    await bug.populate('creator')
    return bug
  }

  async getAllBugs() {
    const bugs = await dbContext.Bug.find()
    return bugs
  }

  async getBugById(bugId, userId) {
    const bug = await dbContext.Bug.findById(bugId).populate('creator')
    if (!bug) throw new Error(`No Bug at id ${bugId}`)
    if (userId != bug.creatorId) throw new Error(`Leave this bug alone now!`)
    return bug
  }

  async editBug(bugId, updatedData, userId) {
    const ogBug = await dbContext.Bug.findById(bugId)
    if (!ogBug) throw new Error(`The bug with an id of ${bugId} does not require any updates.`)
    if (userId != ogBug.creatorId) throw new Forbidden(`Stop what you're doing thief.`)
    if (updatedData.description) ogBug.description = updatedData.description
    ogBug.closed ?? updatedData.closed
    if (!ogBug) throw new Error(`The bug with an id of ${bugId} does not require any updates.`)
    if (userId != ogBug.creatorId) throw new Forbidden(`Stop what you're doing thief.`)
    if (updatedData.title) ogBug.title = updatedData.title
    ogBug.closed ?? updatedData.closed
    await ogBug.save()
    return ogBug
  }

  async removeBug(bugId, userId) {
    const bugToRemove = await this.getBugById(bugId, userId)
    await bugToRemove.deleteOne()
    return "Bug was stepped on"
  }


}

export const bugsService = new BugsService()