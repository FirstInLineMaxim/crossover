import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import Popup from "./popup";
import domtoimage from "dom-to-image";
import "../popup/Popup.css";
import { saveAs } from "file-saver";


export default function ImageFetch({query}){
    const [openPopup,setOpenPopup] = useState(false)
    const [imageArray,setimageArray] = useState([])
    const [currentPage,setCurrentPage] =useState(1)
    const [postsPerPage,setPostsPerPage] = useState(20)
    const [imageIndex,setImageIndex] = useState()

    useEffect(()=>{
        async function fetchData(){
       await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=80`,{
            headers:{
                Authorization: "563492ad6f9170000100000124ab6329ef3741459a9f0df02892ac91"

                Authorization: "563492ad6f917000010000018d6e567481954be7adb58821c258f84b"

            }
        })
        .then((res)=>res.json())
        .then((data)=>setimageArray(data.photos))
        }
        fetchData()
        
    },[query])
    
    function popup(e){ 
        
        
        setOpenPopup(true)
      }

  const saveImgHandler = () => {
    domtoimage.toBlob(document.getElementById("my-node")).then(function (blob) {
      window.saveAs(blob, "image.png");
    });
  };


    const lastPostIndex= currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts =  imageArray.slice(firstPostIndex,lastPostIndex)
   
    const  imageMap= currentPosts.map((i,index)=>{

       return(
        <>
       <button  style={{background: 'none',border:'0px'}} onClick={()=>{
        setOpenPopup(true)
        setImageIndex(i)
        console.log(i)
       }}> <figure > <img  src={i.src.tiny} className="single-image" /></figure></button>
   
     </>
       )
    })
    
    if(imageArray&&imageIndex){
    return(
        <>
       <div className="media-container">
            <span className="media-grid"> {imageMap} </span>
        </div>
    <Popup open={openPopup} onClose={()=>setOpenPopup(false)}>
        <div style={{width:'1000px',height:'600px',background: 'white',border:'0px'}} >
        <h1>{imageIndex.photographer}</h1>
        <img src={imageIndex.src.medium}/>
        </div>
    </Popup>

       <Pagination totalPosts={imageArray.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>

        </>
    )
}

    return(
        <>
        <div className="media-container">
            <span className="media-grid"> {imageMap} </span>
        </div>
           <Pagination totalPosts={imageArray.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>
            </>
    )
}

