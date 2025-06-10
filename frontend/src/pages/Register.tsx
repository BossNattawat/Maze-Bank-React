'use client'

import { type SubmitHandler, useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { IdCard } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

interface FormData {
    username: string
    password: string
    confirmPassword: string
    cardNumber: number
}

function Register() {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>()
    const { signup } = useAuthStore()

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);
        if(!data.username || !data.password || !data.confirmPassword || !data.cardNumber) {
            toast.error("All field are required!")
            return
        }
        if(data.cardNumber.toString().length !== 6) {
            toast.error("Card number must be 6 digits long!")
            return
        }
        if(data.password !== data.confirmPassword) {
            toast.error("Password do not match!")
            return
        }

        const formData = {
            username: data.username,
            cardNumber: data.cardNumber.toString(),
            password: data.password
        }

        signup(formData)
    }

  return (
    <div>
        <div className="flex flex-col justify-center items-center">
            <h1 className='text-4xl my-8'>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-y-5'>
                <label className="input input-lg  rounded">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input
                        type="text"
                        required
                        placeholder="Username"
                        id='username'
                        {...register("username", { required: "Userusername is required" })}
                    />
                </label>
                <label className="input input-lg  rounded">
                    <IdCard color='#7e7c7c' />
                    <input
                        type="number"
                        required
                        placeholder="Card Number (6 Digits Long)"
                        id='cardNumber'
                        {...register("cardNumber", { required: "Card Number is required" })}
                    />
                </label>
                <label className="input input-lg rounded">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <path
                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                        ></path>
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        {...register("password", {required: "Password is required"})}
                    />
                </label>
                <label className="input input-lg rounded">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <path
                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                        ></path>
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input
                        type="password"
                        required
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {required: "Confirm Password is required"})}
                    />
                </label>
                <p>Already have an account? <Link to="/login" className='text-red-600'>Login</Link></p>
                <div className="flex flex-col gap-y-8 w-[320px]">
                    <button type='submit' className='bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black' disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Register"}</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register