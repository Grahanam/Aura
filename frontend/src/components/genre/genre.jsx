import { faGenderless } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { connect } from "react-redux"


const Genre=({access})=>{
    const [genre,setgenre]=useState([])
    
    let getAllGenre=async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/genre/`, config);
            // const art=  await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${data}`, config);
            setgenre(res.data)
        } catch (err) {
            console.log('something went wrong')
        }
    }  

    useEffect(()=>{
        getAllGenre()
    },[])

    return(
        <>
           <div className='px-1 py-1 md:px-6 md:py-3 lg:px-6 lg:py-3'>
                <div>
                    <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider hover:underline ">Browse All</h1>
                </div>
                <div className='w-full flex flex-wrap'>
                    {genre.map((genres)=>(
                        <Link to={`/genre/${genres.id}`}>
                        <div className='h-24 w-24 md:h-44 md:w-44 lg:h-44 lg:w-44 m-1 md:m-4 lg:m-4 rounded'>
                          <div className='h-full w-full bg-no-repeat bg-cover bg-center rounded'  style={{backgroundImage:`url(${genres.img}`}}>
                            <h1 className='text-lg md:text-2xl lg:text-2xl p-2 text-white'>{genres.title }</h1></div>
                          <div className=''></div>
                        </div>
                        </Link>
                    ))
                       
                    }
                    {/* <div className='h-44 w-44 m-4 rounded'>
                        <div className='h-full w-full bg-no-repeat bg-cover bg-center rounded'  style={{backgroundImage:`url('https://c4.wallpaperflare.com/wallpaper/385/361/317/digital-digital-art-artwork-blue-purple-hd-wallpaper-preview.jpg')`}}>
                            <h1 className='text-2xl p-2 text-white'>Heading</h1></div>
                        <div className=''></div>
                    </div>
                    <div className='h-44 w-44 m-4 rounded'>
                        <div className='h-full w-full bg-white rounded '>yo</div>
                        <div className=''></div>
                    </div>
                    <div className='h-44 w-44 m-4 rounded'>
                        <div className='h-full w-full bg-white rounded '>yo</div>
                        <div className=''></div>
                    </div>
                    <div className='h-44 w-44 m-4 rounded'>
                       <div className='h-full w-full bg-white rounded '>yo</div>
                       <div className=''></div>
                    </div>
                    <div className='h-44 w-44 m-4 rounded'>
                        <div className='h-full w-full bg-white rounded '>yo</div>
                        <div className=''></div>
                    </div> */}
                </div>
            </div>
            
        </>
    )
}
const mapStateToProps = state=>({
    access:state.auth.access,
    
})

export default connect(mapStateToProps,{})(Genre)