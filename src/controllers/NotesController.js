import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesServices";



export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNotes)
      .delete('/:noteId', this.removeNote)
  }

  async createNotes(request, response, next) {
    try {
      const noteData = request.body
      const userInfo = request.userInfo
      noteData.creatorId = userInfo.id
      const note = await notesService.createNotes(noteData)
      response.send(note)
    } catch (error) {
      next(error)
    }
  }

  async removeNote(request, response, next) {
    try {
      const removedNote = await notesService.removeNote()
      response.send(removedNote)
    } catch (error) {
      next(error)
    }
  }
}