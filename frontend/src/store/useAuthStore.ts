import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

interface User {
    _id: string
    username: string
    cardNumber: string
    accountBalance: number
    transactionHistory: string[]
}

interface FormDataSignup {
    username: string
    cardNumber: string
    password: string
}

interface FormDataSignin {
    username: string
    password: string
}

interface Store {
    authUser: null | User
    isSigningUp: boolean
    isLogginIn: boolean
    isCheckingAuth: boolean
    checkAuth: () => void
    signup: (data: FormDataSignup) => void
    login: (data: FormDataSignin) => void
    logout: () => void
}

export const useAuthStore = create<Store>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogginIn: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
        }
        catch(err) {
            console.log(`Error in checkAuth: ${err}`);
            set({authUser: null})
        }
        finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success("Account created successfully")
        }
        catch(err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        }
        finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLogginIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success("Logged in successfully")
        }
        catch(err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        }
        finally {
            set({ isLogginIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("Logged out successfully")
        }
        catch(err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        }
    },


}))