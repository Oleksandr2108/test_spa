'use client'

import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

const AddresSection = () => {
  const user = useSelector((state: RootState) => state.users.user)
  if (!user) {
    return null;
  }

  return (
    <div className="rounded-lg p-3 bg-white">
      <h2 className="text-black text-lg">Address</h2>
      <div className="flex mt-4">
        <div>
          <p className="text-black text-sm">{user.address.street}</p>
          <p className="text-black text-sm">{user.address.suite}</p>
          <p className="text-black text-sm">{user.address.city}, {user.address.zipcode}</p>
          <p className="text-black text-xs">Coordinates: {user.address.geo.lat}, {user.address.geo.lng}</p>
        </div>
      </div>
      
    </div>
  )
}

export default AddresSection;