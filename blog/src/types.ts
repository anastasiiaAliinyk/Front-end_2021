export type CustomTheme = {
  title: string
  colors: {
    text: string
    primaryBackground: string
    secondaryBackground: string
  }
  logo: any
  hero: any
}

export type Article = {
  title: string
  slug: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  description: string
  author: {
    username: string
    bio: null
    image: string
    following: boolean
  }
  favorited: boolean
  favoritesCount: number
}

export type Tag = string;

export type User = {
  id: string
  email: string
  createdAt: string
  updatedAt: string
  username: string
  bio: null | string
  image: string | null
  token: string
}
