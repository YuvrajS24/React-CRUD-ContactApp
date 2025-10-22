
import { IoSearch } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";

const Input = ({onAddClick,setSearchTerm}) => {
  return (
    <>

<div className='flex justify-center px-2 sm:px-4 md:px-6 ' >

<div className="flex items-center sm:flex-row w-full max-w-[1200px] gap-2">

<div className='relative flex-1 w-full'>

   
    <input onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search Contact' className='pl-10 pr-2 placeholder-white border border-white rounded-md text-white wborder h-[40px] max-w-[1200px] w-full bg-transparent '/>
    <IoSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-white text-lg '/>

</div>

<FaCirclePlus onClick={onAddClick} className="text-white text-4xl cursor-pointer mt-2 sm:mt-0 " />

</div>


    </div>

    </>
  )
}

export default Input
