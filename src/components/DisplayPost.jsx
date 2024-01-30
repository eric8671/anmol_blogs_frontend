import React ,{useEffect, useState}from 'react'
import {Box} from '@mui/material'
import PostCard from '../components/PostCard'

const DisplayPost =()=>{
    
    const [posts,setPosts] = useState([])

    useEffect(()=>{
       const fetchData = async()=>{
        const res = await fetch("http://localhost:7000/api/blog",{
            method:"GET",
            headers:{
                token:localStorage.getItem("token")
            }
        })
        const data = await res.json()
        if(res.ok){
            setPosts(data)
        }
        else{
            console.log(data);
        }
       }
       fetchData()
    },[posts])
    return(
        <Box sx={{maxWidth:"500px",display:"flex", flexDirection:"column",margin:"auto",gap:3,py:4}}>
            {posts && posts.map(post=>(
                <PostCard post ={post} key={post.id} />
            ))}
        </Box>
    )
}
export default DisplayPost