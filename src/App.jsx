import React, { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import "./App.css";

const App = () => {

  const [editIndex, setEditIndex] = useState(null)
  const [drawerOpen,setDrawerOpen] = useState(false) 
  const [search, setSearch] = useState("")

  const [students, setStudents] = useState(()=>{
    const data = localStorage.getItem("students")
    return data ? JSON.parse(data) : []
  })

  const [form, setForm] = useState({
    fullName:"",
    class:"",
    roll:"",
    subject:"",
    dob:""
  })

  useEffect(()=>{
    localStorage.setItem("students", JSON.stringify(students))
  },[students])

  const HandleDrawer = ()=>{
      setDrawerOpen(true)
  }

  const handleInput = (e)=>{
    const {name,value} = e.target
    setForm({
      ...form,
      [name]:value
    })
  }

  const createStudent = (e)=>{
    e.preventDefault()

    setStudents([
      ...students,
      form
    ])

    resetForm()
  }

  const saveStudent = (e)=>{
    e.preventDefault()

    const backup = [...students]
    backup.splice(editIndex,1,form)

    setStudents(backup)

    setEditIndex(null)
    resetForm()
  }

  const deleteStudent = (index)=>{
    const backup = [...students]
    backup.splice(index,1)
    setStudents(backup)
  }

    const editStudent = (index)=>{
      setForm(students[index])
      setEditIndex(index)
      setDrawerOpen(true)
    }

  const resetForm = ()=>{
    setForm({
      fullName:"",
      class:"",
      roll:"",
      subject:"",
      dob:""
    })
    setRight(-450)
  }

  const filteredStudents = students.filter((item)=>
    item.fullName.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div style={{background:"#ddd", minHeight:"100vh"}}>

      <div style={{
        background:"white",
        width:"95%",
        maxWidth:1000,
        margin:"20px auto",
        padding:20
      }}>

        <h1 style={{textAlign:"center"}}>Student Management</h1>

        <div style={{
          display:"flex",
          justifyContent:"space-between",
          flexWrap:"wrap",
          gap:10
        }}>

          <button
          onClick={HandleDrawer}
          style={{
            border:"none",
            background:"#ed992d",
            color:"white",
            padding:"12px 18px",
            borderRadius:4,
            cursor:"pointer"
          }}>
          <i className="ri-user-add-line"></i> New Student
          </button>

          <input
          placeholder="Search student..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={{
            padding:10,
            border:"1px solid #ccc",
            borderRadius:6
          }}
          />

        </div>

        <div style={{overflowX:"auto", marginTop:20}}>

        <table className="crud-app">

          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Class</th>
              <th>Roll</th>
              <th>Subject</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody >
                {
                filteredStudents.length === 0 && (
                <tr>
                <td colSpan="7" style={{textAlign:"center", padding:20}}>
                No students found
                </td>
                </tr>
                )
                }

            {filteredStudents.map((item,index)=>(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.fullName}</td>
                <td>{item.class}</td>
                <td>{item.roll}</td>
                <td>{item.subject}</td>
                <td>{item.dob}</td>

                <td>
                  <div style={{ display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}> 

                  <button
                  onClick={()=>editStudent(index)}
                  style={{
                    border:"none",
                    height:32,
                    width:32,
                    background:"#2fe422a9",
                    color:"white",
                    borderRadius:4,
                    marginRight:6
                  }}>
                  <i className="ri-edit-box-line"></i>
                  </button>

                  <button
                  onClick={()=>deleteStudent(index)}
                  style={{
                    border:"none",
                    height:32,
                    width:32,
                    background:"red",
                    color:"white",
                    borderRadius:4
                  }}>
                  <i className="ri-delete-bin-line"></i>
                  </button>
                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

        </div>

      </div>

      {
            drawerOpen && (
            <div
            onClick={()=>setDrawerOpen(false)}
            style={{
              position:"fixed",
              top:0,
              left:0,
              width:"100%",
              height:"100%",
              background:"rgba(0,0,0,0.4)",
              zIndex:999
            }}></div>
            )
            }

      <aside style={{
        position:"fixed",
          top:0,
          right:0,
          width:"100%",
          maxWidth:420,
          height:"100%",
          background:"white",
          boxShadow:"0 0 10px rgba(0,0,0,0.3)",
          padding:24,
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition:"0.3s ease",
          zIndex:1000
      }}>

      <button
      onClick={()=>setDrawerOpen(false)}
      style={{
        border:"none",
        background:"white",
        fontSize:20,
        position:"absolute",
        right:20,
        top:20
      }}>
      <i className="ri-close-circle-line"></i>
      </button>

      <h2>{editIndex === null ? "New Student" : "Edit Student"}</h2>

      <form
      onSubmit={editIndex === null ? createStudent : saveStudent}
      style={{display:"flex", flexDirection:"column", gap:16}}>

        <input name="fullName" value={form.fullName} onChange={handleInput} placeholder="Name" required/>
        <input name="class" value={form.class} onChange={handleInput} placeholder="Class" required/>
        <input name="roll" value={form.roll} onChange={handleInput} placeholder="Roll" required/>
        <input name="subject" value={form.subject} onChange={handleInput} placeholder="Subject" required/>
        <input type="date" name="dob" value={form.dob} onChange={handleInput} required/>

        <button style={{
          border:"none",
          background: editIndex === null ? "#ed992d" : "deeppink",
          color:"white",
          padding:12,
          borderRadius:4
        }}>
        {editIndex === null ? "Submit" : "Save"}
        </button>

      </form>

      </aside>

    </div>
  )
}

export default App