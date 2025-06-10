"use client";
import Button from "../components/Button";
import UserSeviceHeader from "../components/UserSeviceHeader";
import { useAuthStore } from "../store/useAuthStore";

export default function Home() {

    const { logout } = useAuthStore()

  return (
    <div className="">
      <UserSeviceHeader text="Choose a service." />
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center justify-center w-[300px] gap-y-5 mt-15">
          <Button title="Deposit" to="/deposit" />
          <Button title="Withdraw" to="/withdraw" />
          <Button title="Transfer" to="/transfer" />
          <Button title="Transaction Log" to="/" />
          <button
            onClick={logout}
            className="bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
