import { Link } from 'react-router-dom'

interface ButtonProps {
    title: string
    to: string
}

function Button({ title, to }: ButtonProps) {
  return (
    <Link to={to} className='bg-linear-to-b from-red-800 to-red-600 text-2xl text-white py-3 w-full text-center rounded hover:outline-2 outline-black'>{title}</Link>
  )
}

export default Button