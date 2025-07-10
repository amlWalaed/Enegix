import { Database } from './database'

export class SessionStore {
  static async saveSession(session: User): Promise<void> {
    const db = await Database.ensureDB()
    await db.put('sessions', session)
  }
  static async getSession(id: number): Promise<User | undefined> {
    const db = await Database.ensureDB()
    return db.get('sessions', id)
  }
  static async removeSession(id: number): Promise<void> {
    const db = await Database.ensureDB()
    return db.delete('sessions', id)
  }
}
