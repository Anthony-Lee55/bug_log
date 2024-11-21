import { dbContext } from "../db/DbContext"
import { logger } from "../utils/Logger"


class NotesService {

  async createNotes(noteData) {
    const note = await dbContext.Note.create(noteData)
    await note.populate('creator')
    return note
  }

  async notesByBugId(bugId) {
    logger.log('bugId', bugId)
    const noteByBugId = await dbContext.Note.find({ bugId: bugId }).populate('creator')
    if (noteByBugId == null) throw new Error(`Invalid id: ${bugId}`)
    return noteByBugId
  }
}

export const notesService = new NotesService()