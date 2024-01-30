import React,{useState,useEffect} from 'react'
import {Card,CardContent, Typography, TextField,Box,SpeedDial,SpeedDialIcon} from "@mui/material"
import {useNavigate,useParams} from 'react-router-dom'

const UpdatePost = ()=>{
    const [blog, setBlog] = useState({title:"",content:"",image:""})
    const {id} = useParams()
    const navigator = useNavigate()

    useEffect(()=>{
        const fetchSingleBlog = async()=>{
            const res = await fetch("http://localhost:7000/api/blog/"+id,{
                method:"GET",
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            const data = await res.json()
            if(res.ok){
                setBlog(data)
            }
            else{
                console.log(data)
            }

        }
        fetchSingleBlog()

    },[id])

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value; 
        setBlog({...blog,[name]:value})
    }
    const handleSubmit = async()=>{
        console.log(blog);
        const res = await fetch("http://localhost:7000/api/blog/update/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blog)
        })

        const data = await res.json()
        if(res.ok){
            alert("blog updated")
            navigator("/")
        }
        else{
            console.log(data)
        }

    }


    return(
        <Card sx={{p:4,py:5,maxWidth:"550px",margin:"50px auto",display:"flex",flexDirection:"column",gap:4}}>
        <CardContent sx={{m:0}}>
            <Typography gutterBottom variant="h4" component = "div" sx={{m:0}}>
                Update Blog!
            </Typography>
        </CardContent>
        <TextField id="outlined-basic" label="Title" variant="outlined" name='title' value={blog.title} onChange={handleChange}/>
        <TextField id="outlined-basic" label="imageURL" variant="outlined" name='image' value={blog.image} onChange={handleChange}/>
        <TextField id="outlined-basic" label="Content" variant="outlined" rows={3} multiline name='content' value={blog.content} onChange={handleChange}/>
        <Box sx={{textAlign:"center"}}>
        <SpeedDial
  ariaLabel="SpeedDial basic example"
  onClick={handleSubmit}
  icon={<SpeedDialIcon />}
></SpeedDial>
        </Box>
        </Card>
    )
}
export default UpdatePost