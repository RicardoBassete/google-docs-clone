'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export async function getUsers() {
  const { sessionClaims } = await auth()
  const clerk = await clerkClient()

  let response
  if (sessionClaims?.org_id) {
    response = await clerk.users.getUserList({
      organizationId: [sessionClaims?.org_id as string]
    })
  } else {
    response = await clerk.users.getUserList()
  }

  const users = response.data.map(user => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',
    avatar: user.imageUrl
  }))

  return users
}
