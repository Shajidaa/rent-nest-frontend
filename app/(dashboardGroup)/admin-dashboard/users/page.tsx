import React from 'react'
import { getAllUser } from '../_actions/userAction'

export default async function page() {
  const users= await getAllUser()

  
  return (
    <div>page</div>
  )
}
