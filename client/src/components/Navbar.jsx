import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='shadow-md'>
            <div className='flex justify-between items-center p-8'>
                <div className='font-bold text-2xl'>
                    <Link to="/" className=' hover:text-fuchsia-500'>ExpressWrite</Link>
                </div>
                <div className='flex justify-between items-center gap-10 font-bold text-2xl'>
                    <Link to="/" className=' hover:text-fuchsia-500'>Home</Link>
                    <Link to="/create" className=' hover:text-fuchsia-500'>Create</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

