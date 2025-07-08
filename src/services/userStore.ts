import { Database } from './database'

export class UserStore {
  /**
   * Save a single user to IndexedDB
   */
  static async saveUser(user: User): Promise<void> {
    try {
      const db = await Database.ensureDB()
      await db.put('users', user)
    } catch (error) {
      throw new Error(
        `Failed to save user: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  /**
   * Save multiple users to IndexedDB
   */
  static async saveUsers(users: User[]): Promise<void> {
    try {
      const db = await Database.ensureDB()
      const tx = db.transaction('users', 'readwrite')

      await Promise.all([...users.map((user) => tx.store.put(user)), tx.done])
    } catch (error) {
      throw new Error(
        `Failed to save users: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  /**
   * Get all users from IndexedDB
   */
  static async getUsers(): Promise<User[]> {
    try {
      const db = await Database.ensureDB()
      return await db.getAll('users')
    } catch (error) {
      throw new Error(
        `Failed to get users: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  /**
   * Get a specific user by ID
   */
  static async getUser(id: number): Promise<User | undefined> {
    try {
      const db = await Database.ensureDB()
      return await db.get('users', id)
    } catch (error) {
      throw new Error(
        `Failed to get user: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  /**
   * Find user by username
   */
  static async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const db = await Database.ensureDB()
      const users = await db.getAll('users')
      return users.find((user) => user.username === username)
    } catch (error) {
      throw new Error(
        `Failed to find user by username: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  /**
   * Clear all users from IndexedDB
   */
  static async clearUsers(): Promise<void> {
    try {
      const db = await Database.ensureDB()
      await db.clear('users')
    } catch (error) {
      throw new Error(
        `Failed to clear users: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }
  /**
   * Get total number of users stored
   */
  static async getUserCount(): Promise<number> {
    try {
      const db = await Database.ensureDB()
      return await db.count('users')
    } catch (error) {
      throw new Error(
        `Failed to get user count: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }
}
