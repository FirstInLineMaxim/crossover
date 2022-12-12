import React, { useRef, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function SearchBar({ onQuery }) {
  const [autoSearch,setAutoSearch]=useState()
  const [incompleteWord,setIncompleteWord]=useState()

  const search = useRef()
  useEffect(() => {
    fetch(`https://api.datamuse.com/words?sp=${incompleteWord}??`).then(data => data.json()).then(data => setAutoSearch(data))
  }, [incompleteWord])


  //saves input value
  function handleChange(e) {
    setIncompleteWord(e.target.value)
    search.current = e.target.value
  }
  function searchQuery() {
    //setSearchInput in App.js
    onQuery(search.current)
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      searchQuery();
    }
  };

  return (
    <>
    <p>{incompleteWord}</p>
     {autoSearch && <Autocomplete onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeypress(e)}
        freeSolo
        id="free-solo-2-demo"
        options={autoSearch.map((option) => option.word)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />}
      <input type="text" placeholder="Search Here" onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeypress(e)} ></input>
      <button onClick={searchQuery}>Search</button>
    </>
  )
}