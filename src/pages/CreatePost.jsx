import React ,{useState} from 'react';
import {Card, CardContent, Typography,TextField,SpeedDial,SpeedDialIcon} from '@mui/material'

const CreatePost=()=>{
    const [blog, setBlog] = useState({title:"",content:"",image:""})
 
    const handleChange=(e)=>{
           const name= e.target.name;
           const value= e.target.value;
           setBlog({...blog, [name]: value})
    }
   
    const handleSubmit= async()=>{
       console.log(blog);
       const res = await fetch("https://anmolramaniblogs.onrender.com/api/blog/create",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          token:localStorage.getItem("token")
        },
        body:JSON.stringify(blog)
       })
       const data = await res.json()
       if(res.ok){
        console.log(data);
        alert("blog created")
        setBlog({title:"",content:"",image:""})
       }
       else{
        console.log(data);
       }
    }

  return(
    <Card sx={{p:2,py:2,maxWidth:"600px", margin:"50px auto",display:"flex",flexDirection:"column",gap:3,borderRadius:"10px"}}>
        <CardContent sx={{m:0}}>
            <Typography gutterBottom variant="h5" component="div" sx={{m:0}}>
                    Write Your Blog!
            </Typography>

        </CardContent>
        <TextField id="outlined-basic" label="title" variant="outlined" name='title'  onChange={handleChange} value={blog.title}/>
        <TextField id="outlined-basic" label="ImageURL" variant="outlined" name='image'  onChange={handleChange} value={blog.image}/>
        <TextField id="outlined-basic" label="content" variant="outlined" name='content' rows={5} onChange={handleChange} value={blog.content}  multiline/>
        
        <SpeedDial
  ariaLabel="SpeedDial basic example"
  icon={<SpeedDialIcon />}
  onClick={handleSubmit}
></SpeedDial>


    </Card>
  )
}
export default CreatePost