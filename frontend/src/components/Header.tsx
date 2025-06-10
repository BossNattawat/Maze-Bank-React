import { useAuthStore } from "../store/useAuthStore";


function Header() {

  const { authUser } = useAuthStore()

  return (
    <div className="flex justify-between border-b-4 border-red-600 pb-4">
      <h1 className="text-5xl">Maze Bank</h1>
      <div className="flex items-end">
        <h3 className="text-2xl">Account balance ${authUser?.accountBalance}</h3>
      </div>
    </div>
  );
}

export default Header;
