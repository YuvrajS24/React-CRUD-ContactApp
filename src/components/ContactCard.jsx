import React from 'react'
import { FaRegUserCircle, FaRegEdit } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";





const ContactCard = ({contact,onDelete,onEdit}) => {
  return (
    <>

    <div className='max-w-[1200px] w-[95%]  mx-auto h-[64px] bg-[#FFEAAE] rounded-lg mt-6 flex items-center px-4 justify-between  '>


<div className='flex items-center gap-4 min-w-0 flex-1'>
    <FaRegUserCircle className='text-[#F6820C] text-3xl sm:text-5xl '/>

    <div className="flex flex-col  font-['Poppins']   " >
        <h3 className='font-bold text-sm sm:text-lg text-gray-900 truncate'>{contact.name}</h3>
        <p className='text-xs sm:text-sm text-gray-700 truncate'>{contact.email}</p>
    </div>
</div>



    <div className='flex gap-3 flex-shrink-0 ml-2 '>
    <FaRegEdit onClick={()=>onEdit(contact)}  className='text-2xl sm:text-3xl cursor-pointer' />
    <ImBin2 onClick={()=>onDelete(contact.id)} className='text-2xl sm:text-3xl cursor-pointer text-[#5F00D9]' />
    </div>


</div>
</>
  )
}

export default ContactCard
