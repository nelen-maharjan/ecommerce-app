import React from 'react'

const Card = ({title, children}) => {
  return (
    <div className='grid grid-cols-4 gap-6 items-center'>
        {children}
    </div>
  )
}

export default Card