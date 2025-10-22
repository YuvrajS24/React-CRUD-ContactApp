import React, { useEffect, useState } from 'react'
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { addDoc,collection,updateDoc,doc} from 'firebase/firestore';
import {db} from '../config/firebase'
import {toast } from 'react-toastify'






const Modal = ({onClose, refreshContacts, editingContact}) => {


const [name,setName] = useState(editingContact? editingContact.name : "");
const[email,setEmail]=useState(editingContact? editingContact.email: "");


const contactRef=collection(db,"contacts");


useEffect(()=>{

  if(editingContact){
     
    setName(editingContact.name);
    setEmail(editingContact.email);

  }
  else{

    setName("");
    setEmail("");

  }


},[editingContact])


const handleSubmit = async (e) => {



e.preventDefault();


if(!name.trim() || !email.trim()){  
 
  toast.error("Name and Email cannot be empty!");
  return;

}






 try { 

  if(editingContact){

    const contactDoc = doc(db,"contacts",editingContact.id);
    await updateDoc(contactDoc,{
      
      name:name,
      email:email,

    });

    toast.success("Contact Updated!");

}

else{

  await addDoc(contactRef,{
    name:name,
    email:email,
  });

  toast.success("Contact Added!");


}
    
    refreshContacts();
    onClose();

}

catch (error) {

toast.error("error adding/updating Contact");

 }


};





    



  return createPortal (

    <>
    <div className='flex justify-center items-center z-50  fixed inset-0 bg-black/30 backdrop-blur-md'>

    <div className='h-[244px] w-full max-w-[1000px] mx-6 bg-white relative  '>

     <IoMdClose onClick={onClose}  className='cursor-pointer absolute top-1 right-1 text-xl'/>

     
    <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6 mt-4' >
      
      <input 
        className='border p-2  '
        type="text" 
        placeholder='Name'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
/>


      <input
        
        className='border p-2'
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
       />

<div className='flex justify-end'>
    <button type='submit'
        className='bg-blue-500 p-2 cursor-pointer rounded w-[30%] '>{editingContact? "Update Contact" : "Add Contact"}

    </button>
</div>


    </form>
    


      
    </div>

    
  </div>
    </>,
    document.getElementById("modal-root")
  )
}

export default Modal
