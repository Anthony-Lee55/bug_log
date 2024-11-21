import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesServices";


export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugById)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.removeBug)
      .get('/:bugId/notes', this.getNotesByBugId)

  }

  async createBug(request, response, next) {
    try {
      const bugData = request.body
      const userInfo = request.userInfo
      bugData.creatorId = userInfo.id
      const bug = await bugsService.createBug(bugData)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getAllBugs(request, response, next) {
    try {
      const bugs = await bugsService.getAllBugs()
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userInfo = request.userInfo
      const bug = await bugsService.getBugById(bugId, userInfo.id)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const updatedData = request.body
      const userInfo = request.userInfo
      const editedBug = await bugsService.editBug(bugId, updatedData, userInfo.id)
      response.send(editedBug)
    } catch (error) {
      next(error)
    }
  }

  async removeBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userInfo = request.userInfo
      const message = await bugsService.removeBug(bugId, userInfo.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(request, response, next) {
    try {
      const bugId = request.params.bugId
      const noteByBugId = await notesService.notesByBugId(bugId)
      response.send(noteByBugId)
    } catch (error) {
      next(error)
    }
  }
}