import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function Update() {
    const [input, setInput] = useState({
        title:"",
        desc:"",
        price:null,
        cover:""
    });

    const navigate = useNavigate();
    const location = useLocation();

    const bookid = location.pathname.split("/")[2];

    const handleChange = (e) =>{
        setInput(prev => ({...prev, [e.target.name]: e.target.value}))
        console.log(input);
    }

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8081/books/"+ bookid, input)
            navigate("/")
        }catch(err){
            console.log(err);
        }
    }
    console.log(input);
  return (
    <div className='form'>
    <h1>Update the Book</h1>
  <div className='form-row'>
        <label htmlFor='title'>Title</label>
        <input 
            type='text' 
            placeholder='Title' 
            onChange={handleChange} 
            name='title' 
            id='title' 
        />
    </div>
    <div className='form-row'>
        <label htmlFor='desc'>Description</label>
        <input 
            type='text' 
            placeholder='Description' 
            onChange={handleChange} 
            name='desc' 
            id='desc' 
        />
    </div>
    <div className='form-row'>
        <label htmlFor='price'>Price</label>
        <input 
            type='number' 
            placeholder='Price' 
            onChange={handleChange} 
            name='price' 
            id='price' 
        />
    </div>
    <div className='form-row'>
        <label htmlFor='cover'>Cover</label>
        <input 
            type='text' 
            placeholder='Cover' 
            onChange={handleChange} 
            name='cover' 
            id='cover' 
        />
    </div>
    <button onClick={handleClick}>Update</button>
</div>
  )
}

export default Update