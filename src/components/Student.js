import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, } from '@mui/material';
import Button from '@mui/material/Button';
export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}

    const[name,setName]=React.useState("")
    const[role,setRole]=React.useState("")
    const[email,setEmail]=React.useState("")
    const[department,setDepartment]=React.useState("")

    const[students,setStudents]=React.useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,role,email,department}
        console.log(student)
        fetch("http://localhost:8080/ramya/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)

        }).then(()=>{
            console.log("New Student added")

        })

    }

    React.useEffect(()=>{
        fetch("http://localhost:8080/students")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result);
        }
    )
    },[])


  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Employee</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Employee Name" variant="outlined" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
        />
      <TextField id="outlined-basic" label="Employee Role" variant="outlined" fullWidth
      value={role}
      onChange={(e)=>setRole(e.target.value)}
       />
      <TextField id="outlined-basic" label="Employee Email" variant="outlined" fullWidth
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <TextField id="outlined-basic" label="Employee Department" variant="outlined" fullWidth 
      value={department}
      onChange={(e)=>setDepartment(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>Submit</Button>
    </Box>
  
    </Paper>
    <h2>Employees List</h2>

    <Paper elevation={3} style={paperStyle}>

        {students.map(student=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}}key={student.id}>
             
                Name:{student.name}<br/>
                Role:{student.role}<br/>
                Email:{student.email}<br/>
                Department:{student.department}<br/>


            </Paper>
        ))}
    </Paper>
    </Container>
  );
}
