'use server'

import { cookies } from 'next/headers'

export async function create(name, token) {
    const cookieStore = await cookies()

    cookieStore.set(name, token)
}
export async function clearToken(name, token) {
    const cookieStore = await cookies()

    cookieStore.delete(name)
}