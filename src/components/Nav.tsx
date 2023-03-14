import { useState } from "react"
import Button from "./Button"
import { Link } from 'react-router-dom'

function Nav() {
    const [ isVisible, setIsVisible ] = useState(false)

    function toggleMenu() {
        setIsVisible(!isVisible)
    }

    return (
        <nav className='flex flex-row items-center justify-between flex-wrap w-full fixed p-3 bg-black text-white'>
        <div className='mr-3 text-xl'>
            Car Inventory
        </div>
        <div>
            <button 
                onClick={toggleMenu}
                className='flex items-center justify-center text-gray-400 border border-black rounded hover:text-white hover:border-white py-1 px-2 text-xl'
            >
                <i className='fas fa-bars'></i>
            </button>
        </div>
        {
            isVisible? (
                <div className='w-full block'>
                    <div className="flex flex-col items-end">
                        <Button className="py-3 px-1 text-gray-400 hover:text-white">
                            <Link to='/' onClick={toggleMenu}>
                                Home
                            </Link>
                        </Button>
                        <Button className="py-3 px-1 text-gray-400 hover:text-white">
                            <Link to='/about' onClick={toggleMenu}>
                                About
                            </Link>
                        </Button>
                        <Button className="py-3 px-1 text-gray-400 hover:text-white">
                            <Link to='/dashboard' onClick={toggleMenu}>
                                Dashboard
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <></>
            )
        }
        
        </nav>
  )
}

export default Nav