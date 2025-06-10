import UserSeviceHeader from '../components/UserSeviceHeader'
import Button from '../components/Button'
import { useActionStore } from '../store/useActionStore'
import { useAuthStore } from '../store/useAuthStore'

function Withdraw() {

    const { withdraw } = useActionStore()
    const { authUser } = useAuthStore()
  
    function handleWithdraw(amount: number) {
      if(authUser) {
        withdraw(amount)
        location.reload();
      }
    }

    const userBalance: number | undefined = authUser?.accountBalance

  return (
    <div>
        <UserSeviceHeader text="Select the amount you wish to withdraw from this account."/>
        <div className="mt-10 flex w-full justify-center gap-x-8">
          <div className="flex flex-col gap-y-8 w-[300px]">
            {typeof userBalance === 'number' && userBalance > 50 && (
              <button onClick={() => handleWithdraw(50)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$50</button>
            )}
            {typeof userBalance === 'number' && userBalance > 500 && (
              <button onClick={() => handleWithdraw(500)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$500</button>
            )}
            {typeof userBalance === 'number' && userBalance > 2500 && (
              <button onClick={() => handleWithdraw(2500)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$2500</button>
            )}
          </div>
          <div className="flex flex-col gap-y-8 w-[300px]">
            {typeof userBalance === 'number' && userBalance > 10000 && (
              <button onClick={() => handleWithdraw(10000)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$10000</button>
            )}
            {typeof userBalance === 'number' && userBalance > 100000 && (
              <button onClick={() => handleWithdraw(100000)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">$100000</button>
            )}
            {typeof userBalance === 'number' && userBalance > 0 && (
              <button onClick={() => handleWithdraw(userBalance)} className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black">${userBalance}</button>
            )}
          </div>
        </div>
        {typeof userBalance === 'number' && userBalance <= 0 && (
            <h1 className='text-center text-2xl'>The amount is insufficient for withdrawal.</h1>
        )}
        <div className="flex w-full justify-center">
            <div className="flex flex-col justify-center items-center w-[300px] gap-y-5 mt-15">
                <Button title='Main Menu' to='/'/>
            </div>
        </div>
    </div>
  )
}

export default Withdraw