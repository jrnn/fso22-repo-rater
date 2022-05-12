export interface Credentials {
  username: string
  password: string
}

export interface Repository {
  id: string
  fullName: string
  description: string
  language: string
  forksCount: number
  stargazersCount: number
  ratingAverage: number
  reviewCount: number
  ownerAvatarUrl: string
  url: string
}

export interface Review {
  id: string
  text: string
  rating: number
  createdAt: string
  user: {
    username: string
  }
}
