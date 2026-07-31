import React from 'react'
import { fetchRentalRequest } from '../_action/rental-request'

export default async function RequestedProperties() {
    const properties=await fetchRentalRequest()
    // console.log(properties,"rental requested property");
    
  return (
    <div>RequestedProperties</div>
  )
}
