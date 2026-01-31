export interface User {
  id: string
  name: string
  email: string
  emailVerified?: boolean
  image?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  role: UserRoles
  status?: UserStatus
}

export enum UserRoles {
    ADMIN,
    SELLER,
    CUSTOMER
}
export enum UserStatus {
    ACTIVE,
    SUSPENDED
}