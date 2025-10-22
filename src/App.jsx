import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Input from './components/Input'
import ContactCard from './components/ContactCard'
import Modal from './components/Modal'
import {getDocs,collection,deleteDoc,doc} from 'firebase/firestore'
import {db} from './config/firebase'
import { ToastContainer,toast } from 'react-toastify'



 
function App() {


  const[isModalopen, setIsModalOpen] =useState(false)
  const[contacts,setContacts]=useState([])
  const[editingContact, setEditingContact]=useState(null)
  const[searchTerm,setSearchTerm]=useState("")



  const contactReference = collection(db,"contacts");

  const getContacts = async () =>{

    
      try {
                 
          const data = await getDocs(contactReference)
          const contactData =data.docs.map((doc)=>(

            
      {
            id:doc.id,
            ...doc.data(),
      }
  ));

        
     
     console.log("Fetched contacts:", contactData)
     setContacts(contactData);
          
         } catch (error) {
             console.log(error)
          
         }
 }


  useEffect(()=>{
     getContacts();
  },[])




  const handleDelete= async (id) =>{

    try {

      await deleteDoc(doc(db,"contacts",id));
      toast.info("Contact Deleted!");
      
      getContacts();
      
    } catch (error) {

         console.error("Error deleting contact:", error);
      
    }


  };

  const handleEdit =async (contact) =>{


    setEditingContact(contact);
    setIsModalOpen(true);



  }




    return (
    <>

    <div className='flex flex-col gap-4 px-2 sm:px-4 md:px-6 lg:px-8'>
    <Navbar/>
    <Input onAddClick={()=>setIsModalOpen(true)} setSearchTerm={setSearchTerm} />


   {contacts

   .filter(contact=>contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
  
   .map((contact)=>(
     <ContactCard key={contact.id} contact={contact} onDelete={handleDelete} onEdit={handleEdit}  />
   ))
   }

  
    </div>
          {isModalopen &&
                      <Modal
                       onClose={()=> {setIsModalOpen(false); setEditingContact(null) } }
                   
                      refreshContacts={getContacts}
                      editingContact={editingContact}

                      /> 
          }

          <ToastContainer position='top-right' autoClose={2000}/>

  
    </>
  )
}

export default App
