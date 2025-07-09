export {}
declare global {
  interface PaginatedMeta {
    current_page: number
    from: number
    to: number
    per_page: number
    total: number
    last_page: number
  }
  interface PaginatedData<T> {
    meta: PaginatedMeta
    data: T[]
  }
}
