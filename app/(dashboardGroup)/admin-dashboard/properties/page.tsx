import { getAllProperty } from "../_actions/property"


export default async function AllProperties() {
  const properties=await getAllProperty()

  
  return (
    <div>AllProperties</div>
  )
}
