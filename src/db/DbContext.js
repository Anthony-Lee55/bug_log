import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BugsSchema } from '../models/Bugs';
import { NotesSchema } from '../models/Notes';
import { TrackedBugsSchema } from '../models/TrackedBug';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Bug = mongoose.model('Bug', BugsSchema)

  Note = mongoose.model('Note', NotesSchema)

  TrackedBug = mongoose.model('TrackedBug', TrackedBugsSchema)
}

export const dbContext = new DbContext()
