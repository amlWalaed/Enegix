export {}
declare global {
  interface PaginatedData<T> {
    meta: object
    data: T[]
    links: object[]
  }
}
