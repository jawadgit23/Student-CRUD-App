import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import './App.css'

const App = () => {
   
  const [editIndex, setEditIndex] = useState(null)
  const [students, setStudents] = useState([])
  const [right, setRight] = useState(-450)
  const [form, setForm] = useState({
    fullName: "",
    class: "",
    roll: "",
    subject: "",
    dob: ""
  })

  const HandleDrawer = ()=>{
    setRight(0)
  }

  const handleInput = (e)=>{
    const input = e.target
    const value = input.value
    const key = input.name
    setForm({
      ...form,
      [key]: value
    })
  }

  const createStudent = (e)=>{
    e.preventDefault()
    setStudents([
      ...students,
      form
    ])
    setForm({
    fullName: "",
    class: "",
    roll: "",
    subject: "",
    dob: ""
    })
    setRight(-450)
  }

  const deleteStudent = (index)=>{
    const backup = [...students]
    backup.splice(index,1)
    setStudents(backup)
  }

  const editStudent = (index)=>{
    setRight(0)
    setForm(students[index])
    setEditIndex(index)
  }
  const saveStudent = (e)=>{
    e.preventDefault()
    const backup = [...students]
    backup.splice(editIndex,1,form)
    setStudents(backup)
    setForm({
      fullName: "",
      class: "",
      roll: "",
      subject: "",
      dob: ""
    })
    setEditIndex(null)
    setRight(-450)
  } 
  return (
    <div style={{
      background: "#ddd",
      minHeight: "100vh"
    }}>
      <div style={{
        background: "white",
        width:"70%",
        margin: "32px auto",
        padding:32
      }}>
      <h1 style={{
        margin: 0,
        padding:0,
        textAlign: 'center'   
      }}>CRUD App</h1>  
      <button 
      onClick={HandleDrawer}
      style={{
        border:"none",
        background:"#ed992d",
        color:"white",
        padding:" 14px 24px",
        borderRadius:4,
        fontSize:14,
        cursor:"pointer",
        margin: '16px 0'
      }}>
        <i className="ri-user-add-line" style={{
          marginRight: 8, 
        }}></i>
        New Student
        </button>
         <table className='crud-app'>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Roll</th>
            <th>Subject</th>
            <th>D.O.B</th>
            <th>Action</th>
          </tr>
        </thead>
          <tbody>
           {
            students.map((item,index)=>(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{item.fullName}</td>
              <td>{item.class}</td>
              <td>{item.roll}</td>
              <td>{item.subject}</td>
              <td>{item.dob}</td>
              <td>
                <div>
                  <button 
                  onClick={()=>editStudent(index)}
                  style={{border:'none', height:32, width:32, background:'#2fe422a9', color:'white', borderRadius:4, marginRight:8, cursor:'pointer'}}>
                    <i className="ri-edit-box-line" ></i>
                  </button>
                  <button 
                  onClick={()=>deleteStudent(index)}
                  style={{border:'none', height:32, width:32, background:'red', color:'white', borderRadius:4, cursor:'pointer'}}>
                   <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </td>
            </tr>
            ))
           }
          </tbody>
      </table>  
      </div>

      <aside style={{
        position:"fixed",
        top:0,
        right:right,
        width:450,
        height:'100%',
        background:'white',
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        padding:32,
        boxSizing:"border-box",
        transition:"0.3s",
      }}>
        <button 
        onClick={()=>setRight(-450)}
        style={{border:"none", background:"white", fontSize:20, color:"#ed992d", position:"absolute", top:20, right:20, cursor:'pointer'}}>
          <i className="ri-close-circle-line" ></i>
        </button>
        <h1>New Student</h1>
        
        <form 
        onSubmit={editIndex === null ? createStudent : saveStudent}
        style={{
          display:'flex', flexDirection:'column', gap:18
        }}>
          <input
          value={form.fullName}
          onChange={handleInput}
          required
          name='fullName' 
          type="text" 
          placeholder='Enter your Name'
          style={{
            border:'1px solid #ccc',
            padding:12,
            borderRadius:8
          }}
          />
          <input
          value={form.class}
          onChange={handleInput}
          required
          name='class' 
          type="number" 
          placeholder='Enter your Class'
          style={{
            border:'1px solid #ccc',
            padding:12,
            borderRadius:8
          }}
          />
          <input
          value={form.roll}
          onChange={handleInput}
          required
          name='roll' 
          type="number" 
          placeholder='Enter your Roll'
          style={{
            border:'1px solid #ccc',
            padding:12,
            borderRadius:8
          }}
          />
          <input
          value={form.subject}
          onChange={handleInput}
          required
          name='subject' 
          type="text" 
          placeholder='Enter your Subject'
          style={{
            border:'1px solid #ccc',
            padding:12,
            borderRadius:8
          }}
          />
          <input
          value={form.dob}
          onChange={handleInput}
          required
          name='dob' 
          type="date" 
          style={{
            border:'1px solid #ccc',
            padding:12,
            borderRadius:8
          }}
          />

          {
            editIndex === null ?
            <button style={{
            border:'none',
            background:"#ed992d",
            color:'white',
            padding:'14px 0',
            fontSize:16,
            borderRadius:4,
            cursor:'pointer'
          }}>Submit</button>
           :
            <button style={{
            border:'none',
            background:"deeppink",
            color:'white',
            padding:'14px 0',
            fontSize:16,
            borderRadius:4,
            cursor:'pointer'
          }}>Save</button>
          }
         
        
        </form>
      </aside>
      
    </div>
  )
}

export default App