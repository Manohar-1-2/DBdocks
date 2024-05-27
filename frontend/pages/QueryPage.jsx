import React, { useContext } from 'react'
import axiosInstance from '../utils/axiosconfig'
import { useState } from 'react'
import UserContext from '../context/UserContext'
const QueryPage = () => {
  const [query,setQuery]=useState(null)
  const {currentDb}=useContext(UserContext)
  const [errorMess,setErrorMess]=useState(null)
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const handlexecute =async()=>{
    console.log(currentDb.container_id,query)
    try {
        const response=await axiosInstance.post('/excute',{
            "form_data":{
                'db_id':currentDb.container_id,
                'db_query':query,
            }
        })
        setData(response.data.result);
        if (response.data.result.length > 0) {
            setColumns(Object.keys(response.data.result[0]));
          }
        console.log(columns)
        setErrorMess(null)
    } catch (error) {
        console.log(error)
        alert(error.response.data.detail)
    }
  }
  return (
    <div className='px-6 py-4'>
        <p className='text-2xl'>Excute Sql Queries</p>
        <div className='p-3 m-3 glassmorphism flex flex-col'>
            <textarea name="" id="" className=' bg-white text-black px-4 py-6 w-[500px] h-[150px] rounded-md  font-semibold' onChange={(e)=>setQuery(e.target.value)}></textarea>
            <button className=' w-[100px] bg-blue text-white rounded-md px-3 py-2 mt-4' onClick={handlexecute}>Execute</button>
        </div>
        <p className='text-2xl'>Result</p>
        <div className='p-3 m-2 glassmorphism h-[250px] overflow-auto'>
           
           <div className="container mx-auto p-4">
            <div className="overflow-x-auto text-black over overflow-scroll">
                <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                    {columns.map((col) => (
                        <th key={col} className="px-4 py-2 border-b">
                        {col}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-100">
                        {columns.map((col) => (
                        <td key={col} className="px-4 py-2 border-b">
                            {row[col]}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
         </div>
        </div>
    </div>
  )
}

export default QueryPage