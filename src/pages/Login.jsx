import React,{useState,useContext} from 'react'
import {Card,Typography,CardContent,TextField,Button} from "@mui/material"
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../App'
 const Login=()=>{
    // return(
    //     <Card sx={{ p:3,maxWidth:"550px",margin:"50px auto",display:"flex",flexDirection:"column",gap:3}}>
    //     <CardContent sx={{m:0}}>
    //     <Typography gutterBottom variant="h4" component="div">
    //       Login Here!
    //     </Typography>
    //     <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    //     <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    //     <Button variant='contained'>Login</Button>
    //   </CardContent>
    
    //     </Card>
    // )
    const [user,setUser]=useState({email:"",password:""})


    const navigator = useNavigate()

    const {setRefresh}=useContext(AuthContext);


    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value})


    }

    const handleSubmit=async()=>{
        console.log(user);
        const res = await fetch("http://localhost:7000/api/user/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if(res.ok){
            localStorage.setItem("token",data.token);
            setRefresh(true)
            navigator("/");
        }
        else{
            console.log(data);
        }
     }

    return (
        <Card sx={{p:4,py:5, maxWidth: "550px", margin: "50px auto" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 ,borderRadius:"15px"}} elevation={10}>
                <Typography gutterBottom variant="h4" component="div" sx={{m:0}}>
                    Login Here!
                </Typography>
                <TextField id="outlined-basic" label="email" variant="outlined" type={"email"} name={"email"} onChange={handleChange} value={user.email} />
                <TextField id="outlined-basic" label="password" variant="outlined" type={"password"} name={"password"} onChange={handleChange} value={user.password} />
                <Button variant='contained' onClick={handleSubmit}>Login</Button>
            </CardContent>
        </Card>
    )
    
 }
 export default Login;