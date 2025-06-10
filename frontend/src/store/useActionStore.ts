import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

interface Data {
    targetCardNumber: string
    amount: number
}

interface Store {
    deposit: (amount: number) => void
    withdraw: (amount: number) => void
    transfer: (data: Data) => void
}

export const useActionStore = create<Store>(() => ({
    deposit: async (amount) => {
        try {
            await axiosInstance.put("/action/deposit", { amount })
            toast.success("Deposit successful")
        }
        catch(err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        }
    },

    withdraw: async (amount) => {
        try {
            await axiosInstance.put("/action/withdraw", { amount })
            toast.success("Withdraw successful")
        }
        catch(err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        }
    },

    transfer: async (data) => {
        try {
            await axiosInstance.put("/action/transfer", data)
            toast.success("Transfer successful")
        }
        catch(err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        }
    }
}))