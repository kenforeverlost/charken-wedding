'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const setSessionData = () => {
  const rsvpLoginData = { loggedIn: true }
  const sessionData = JSON.stringify(rsvpLoginData)

  cookies().set('session', sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 5, // 5 hours
    path: '/',
  })
}

export const getSessionData = () => {
  const sessionData = cookies().get('session')?.value

  return sessionData ? JSON.parse(sessionData) : null
}

export const navigate = async (path: string) => {
  redirect(path)
}
