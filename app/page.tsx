'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import TodoObject from './todo';
import { v4 as uuid } from 'uuid';
import { Id, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { table } from 'console';

const Home=()=> {
   const[todo,settodo]=useState<string>('');

   const[todos,settodos]=useState<TodoObject[]>([]);
    
   const addtodo=()=> {
    if(todo.length!!==0){
    settodos([{id:uuid(),name:todo,completed:false},...todos]);
    notify();
    settodo('');}
    else{
      notify1();
  
     }
   }


   const deletetodo=(id:number)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        todos.splice(id,1);
        settodos([...todos]);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
       


   }
   const notify = () => {

    toast.success("Added Successefuly  !", {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  const notify1=()=>{
       toast.warn("Warning, please Enter a New  Todo  !", {
      position: toast.POSITION.TOP_LEFT
    });
  }


  return (
    <main className="w-full flex justify-center items-center  p-5 flex-col ]" >
      <div className='w-[60%] flex justify-center items-center  flex-col'> <h1 className='text-3xl font-bold p-5'>to do </h1>
       <div>
        <input 
        type="text" 
        value={todo} 
        onChange={(e)=>settodo(e.target.value)} 
        className='w-50 p-4 ring-1 mx-5 ring-black'
         placeholder='Enter New Todo' />
        <button onClick={addtodo}  className='ring-2 ring-black p-4 bg-slate-600 rounded-md'>add</button>
       </div>
       <div className='flex flex-col w-[20rem] p-4'>
       <table className='w-full'>

           {todos.map((todo,index) =>(
              <tr className=' overflow-hidden text-center' key={todo.id}>

                <td className=' overflow-hidden w-[40%]'> {todo.name}</td>
                 <td> <input type='checkbox'/></td> 
                 <td>
                 <button onClick={()=>deletetodo(index)}>delete</button>
                  </td> 
              </tr>
            )
           )}  
    </table> 

    
       </div>
        <ToastContainer />
        </div> 
    </main>
  )
}
export default Home