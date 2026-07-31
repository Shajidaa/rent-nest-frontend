import React from 'react'
import { getAllRental } from '../_actions/rental'

export default async function page() {
  const rental=await getAllRental()
 
  
  return (
    <div>page</div>
  )
}
