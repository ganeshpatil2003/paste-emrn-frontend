import { Loader } from 'lucide-react'
import React from 'react'

const LoadinSpinner = () => {
  return (
    <div>
        <Loader className='m-auto  text-indigo-700 animate-spin h-16 w-16'/>
    </div>
  )
}

export default LoadinSpinner