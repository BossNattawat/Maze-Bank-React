'use client'

import toast from 'react-hot-toast'
import { useAuthStore } from "../store/useAuthStore"
import { useActionStore } from "../store/useActionStore"
import Button from "../components/Button"
import UserSeviceHeader from "../components/UserSeviceHeader"
import { CreditCard } from "lucide-react"
import { useState } from 'react'

function Transfer() {

    const { transfer } = useActionStore()
    const { authUser } = useAuthStore()

    const [cardNumber, setCardNumber] = useState<number | null>(null)
    

    function handleTransfer(amount: number) {
        if(authUser) {
            if(cardNumber === null || cardNumber.toString().length !== 6) {
                toast.error("Card number must be 6 digits long!")
                return
            }
            const data = {
                targetCardNumber: cardNumber.toString(),
                amount: amount
            }
            transfer(data)
            location.reload();
        }
    }

    const userBalance: number | undefined = authUser?.accountBalance

  return (
    <div>
        <UserSeviceHeader text="Select the amount you wish to withdraw from this account."/>
        <div className="flex flex-col justify-center items-center mt-8">
            <div className='flex flex-col justify-center items-center gap-y-5'>
                <label className="input input-lg rounded">
                    <CreditCard color="#878585" />
                    <input
                        type="number"
                        required
                        placeholder="Card number"
                        id='number'
                        onChange={(e) => setCardNumber(parseInt(e.target.value))}
                    />
                </label>
            </div>
            <div className="mt-10 flex w-full justify-center gap-x-8">
                <div className="flex flex-col gap-y-8 w-[300px]">
                    {typeof userBalance === 'number' && userBalance > 50 && (
                        <button onClick={() => handleTransfer(50)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$50</button>
                    )}
                    {typeof userBalance === 'number' && userBalance > 500 && (
                        <button onClick={() => handleTransfer(500)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$500</button>
                    )}
                    {typeof userBalance === 'number' && userBalance > 2500 && (
                        <button onClick={() => handleTransfer(2500)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$2500</button>
                    )}
                </div>
                <div className="flex flex-col gap-y-8 w-[300px]">
                    {typeof userBalance === 'number' && userBalance > 10000 && (
                        <button onClick={() => handleTransfer(10000)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$10000</button>
                    )}
                    {typeof userBalance === 'number' && userBalance > 100000 && (
                        <button onClick={() => handleTransfer(100000)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$100000</button>
                    )}
                    {typeof userBalance === 'number' && userBalance > 0 && (
                        <button onClick={() => handleTransfer(userBalance)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">${userBalance}</button>
                    )}
                </div>
            </div>
            {typeof userBalance === 'number' && userBalance <= 0 && (
                <h1 className='text-center text-2xl'>The amount is insufficient for transfer.</h1>
            )}
            <div className="flex w-full justify-center">
                <div className="flex flex-col justify-center items-center w-[300px] gap-y-5 mt-15">
                    <Button title='Main Menu' to='/'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Transfer