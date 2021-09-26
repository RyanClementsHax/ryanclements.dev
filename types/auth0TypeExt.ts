declare module '@auth0/nextjs-auth0' {
  export interface Claims {
    nickname: string
    name: string
    picture: string
    updated_at: string
    email: string
    email_verified: boolean
    sub: string
  }
}

export {}
