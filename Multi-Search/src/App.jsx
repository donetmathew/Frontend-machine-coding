import { useState,useEffect } from 'react'
import './App.scss'

function App() {
  const [inputTerm, setInputTerm] = useState("");
  const [suggestions,setSuggestions]= useState([]);

  
  useEffect(()=>{
    try{
      const fetchUsers= async()=>{
        if(inputTerm.trim()===""){
          setSuggestions([]);
          return;
        }
        let resp= await fetch(`https://dummyjson.com/users/search?q=${inputTerm}`);
        let users= await resp.json();
        setSuggestions(users);
      }
      fetchUsers();
    }
    catch(e){
      console.log("API error occured");
    }
  },[inputTerm])

  return (
    <>
    <div className="multiSearch">
      <input className="multiSearch__input" type="text" value={inputTerm} onChange={(e)=>setInputTerm(e.target.value)} placeholder="Search for a user..."/>
      <ul>
        {
          suggestions?.users && suggestions?.users.map((user)=>{
            return (
              <li>
                <img src={user?.image} alt="user-image" />
                <span>{`${user.firstName} ${user.lastName}`}</span>
              </li>
            )
          })
        }
      </ul>
    </div>

    </>
  )
}

export default App
