import UserSeviceHeader from '../components/UserSeviceHeader'
import Button from '../components/Button'
import { useActionStore } from '../store/useActionStore'
import { useAuthStore } from '../store/useAuthStore'

function Deposit() {

  const { deposit } = useActionStore()
  const { authUser } = useAuthStore()

  function handleDepost(amount: number) {
    if(authUser) {
      deposit(amount)
      location.reload();
    }
  }
  return (
    <div>
        <UserSeviceHeader text="Select the amount you wish to deposit into this account."/>
        <div className="mt-10 flex w-full justify-center gap-x-8">
          <div className="flex flex-col gap-y-8 w-[300px]">
            <button onClick={() => handleDepost(50)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$50</button>
            <button onClick={() => handleDepost(500)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$500</button>
            <button onClick={() => handleDepost(2500)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$2500</button>
          </div>
          <div className="flex flex-col gap-y-8 w-[300px]">
            <button onClick={() => handleDepost(10000)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$10000</button>
            <button onClick={() => handleDepost(100000)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$100000</button>
            <button onClick={() => handleDepost(500000)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$500000</button>
          </div>
        </div>
        <div className="flex w-full justify-center">
            <div className="flex flex-col justify-center items-center w-[300px] gap-y-5 mt-15">
                <Button title='Main Menu' to='/'/>
            </div>
        </div>
    </div>
  )
}

export default Deposit