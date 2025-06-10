"use client"

import { useAuthStore } from "../store/useAuthStore"

function UserSeviceHeader({ text } : { text: string }) {

  const { authUser } = useAuthStore()

  return (
    <div className="bg-linear-to-b from-red-800 to-red-600 py-1 px-6 mt-10">
        <div>
            <h2 className="text-white text-3xl">{authUser?.username}</h2>
        </div>
        <div className="flex justify-center items-center">
            <h3 className="text-white text-2xl">{text}</h3>
        </div>
    </div>
  )
}

export default UserSeviceHeader