import React from 'react'

const SingleUserCard = ({props}) => {
  return (
    <div key={props.id} className='w-full my-3 flex justify-start gap-2 items-center'>
    <div className='w-[26px] h-[26px] rounded-full bg-app-purple'></div>
    <span className='text-app-black text-xl'>{props.name}</span>
    </div>
  )
}

export default SingleUserCard