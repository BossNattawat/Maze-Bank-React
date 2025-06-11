import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import MainMenu from "./pages/MainMenu"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Deposit from "./pages/Deposit"
import Withdraw from "./pages/Withdraw"
import { useAuthStore } from "./store/useAuthStore"
import { Loader } from "lucide-react"
import Transfer from "./pages/Transfer"
import TransactionLog from "./pages/TransactionLog"

function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-around h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-linear-to-b from-red-800 to-red-600 w-full h-2.5 absolute"></div>
          <div className="flex justify-center items-center">
            <div className="max-w-[70rem] w-[70rem] bg-[#e8e8e8] p-10 h-screen">
              <Header/>
              <Routes>
                <Route path="/" element={authUser ? <MainMenu/> : <Navigate to="/login"/>}/>
                <Route path="/register" element={!authUser ? <Register/> : <Navigate to="/"/>}/>
                <Route path="/login" element={!authUser ? <Login/> : <Navigate to="/"/>}/>
                <Route path="/deposit" element={authUser ? <Deposit/> : <Navigate to="/login"/>}/>
                <Route path="/withdraw" element={authUser ? <Withdraw/> : <Navigate to="/login"/>}/>
                <Route path="/transfer" element={authUser ? <Transfer/> : <Navigate to="/login"/>}/>
                <Route path="/transactionlog" element={authUser ? <TransactionLog/> : <Navigate to="/login"/>}/>
              </Routes>
              <Toaster/>
            </div>
          </div>
    </div>
  )
}

export default App