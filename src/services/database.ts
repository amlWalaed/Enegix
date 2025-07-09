import { openDB, type DBSchema, type IDBPDatabase, deleteDB } from 'idb'

export interface DataBaseSchema extends DBSchema {
  users: { key: number; value: User }
  sessions: { key: number; value: User }
}

export class Database {
  private static db: IDBPDatabase<DataBaseSchema> | null = null
  private static dbName = 'UserSyncDB'
  private static dbVersion = 2 // bump version for new store

  /**
   * Initialize IndexedDB connection
   */
  static async initialize(): Promise<void> {
    try {
      Database.db = await openDB<DataBaseSchema>(Database.dbName, Database.dbVersion, {
        upgrade(db) {
          // Create users store
          if (!db.objectStoreNames.contains('users')) {
            db.createObjectStore('users', { keyPath: 'id' })
          }
          if (!db.objectStoreNames.contains('sessions')) {
            db.createObjectStore('sessions', { keyPath: 'id' })
          }
        },
      })
    } catch (error) {
      throw new Error(
        `Failed to initialize IndexedDB: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  /**
   * Ensure database is initialized
   */
  static async ensureDB(): Promise<IDBPDatabase<DataBaseSchema>> {
    if (!Database.db) {
      await Database.initialize()
    }
    return Database.db!
  }
  /**
   * Remove Database
   */
  static async remove() {
    Database.db?.close()
    await deleteDB(Database.dbName)
  }
}
