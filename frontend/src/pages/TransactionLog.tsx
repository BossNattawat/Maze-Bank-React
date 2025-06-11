import { useEffect } from "react"
import { useActionStore } from "../store/useActionStore"
import UserSeviceHeader from "../components/UserSeviceHeader"
import { useAuthStore } from "../store/useAuthStore"
import Button from "../components/Button"

interface Log {
    _id: string
    amount: number
    to?: string
    type: string
}

function TransactionLog() {

  const { logs, getTransactionLog } = useActionStore()
  const { authUser } = useAuthStore()

  useEffect(() => {
    getTransactionLog()
  }, [getTransactionLog])

  const getAmountPrefix = (log: Log) => {
  if (log.type === "DEPOSIT") return "+";
  if (log.type === "TRANSFER") {
    return log.to === authUser?._id ? "+" : "-";
  }
  return "-";
};

  return (
    <div>
      <UserSeviceHeader text="Transaction Log" />
      <h2 className="text-center my-3 text-xl">Here are your last {logs.length} transactions</h2>
      <div className="flex flex-col gap-y-1 max-h-[500px] overflow-y-scroll">
        {logs.map((log, index) => (
          <div key={index} className="flex justify-between bg-[#e0a4a6] px-4 py-1">
            <h1 className="text-xl font-semibold">{log.type}</h1>
            <p className="text-xl font-semibold">{getAmountPrefix(log)}${log.amount} DB</p>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center">
            <div className="flex flex-col justify-center items-center w-[300px] gap-y-5 mt-6">
                <Button title='Main Menu' to='/'/>
            </div>
        </div>
    </div>
  )
}

export default TransactionLog