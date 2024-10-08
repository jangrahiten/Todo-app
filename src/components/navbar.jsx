import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-around bg-indigo-900 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-4xl m-7 '>MyTasks</span>
        </div>
        <ul className='flex gap-8 justify-centre items-center mx-7  text-xl'>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default navbar
