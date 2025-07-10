import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import bcrypt from 'bcryptjs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const paginate = <T>(data: Array<T>, currentPage: number = 1, pageSize: number = 10) => {
  if (!Array.isArray(data)) {
    throw new TypeError('Data must be an array')
  }

  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / pageSize)

  // Ensure currentPage is within valid range
  currentPage = Math.max(1, Math.min(currentPage, totalPages))

  const offset = (currentPage - 1) * pageSize
  const paginatedItems = data.slice(offset, offset + pageSize)

  return {
    data: paginatedItems,
    meta: {
      current_page: currentPage,
      from: offset + 1,
      to: offset + paginatedItems.length,
      per_page: pageSize,
      total: totalItems,
      last_page: totalPages,
    },
  }
}
export const checkPassword = async (inputPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(inputPassword, hashedPassword)
}
