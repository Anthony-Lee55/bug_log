import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BugsSchema } from '../models/Bugs';
import { NotesSchema } from '../models/Notes';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Bug = mongoose.model('Bug', BugsSchema)

  Note = mongoose.model('Note', NotesSchema)
}

export const dbContext = new DbContext()
