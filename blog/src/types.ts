
export type CustomTheme = {
  title: string
  colors: {
    text: string
    primaryBackground: string
    secondaryBackground: string
  }
  logo: string
  hero: string
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

export type NewArticle = {
  title: string
  description: string
  body: string
  tagList: string[]
}

export type CommentT = {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
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
