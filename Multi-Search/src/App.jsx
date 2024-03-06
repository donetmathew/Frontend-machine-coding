import { useState, useEffect,useRef } from "react";
import Pill from "./components/Pill/Pill";
import "./App.scss";

function App() {
  const [inputTerm, setInputTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const inputRef=useRef();

  const onUserSelect = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setInputTerm("");
    inputRef.current.focus();
  };

  const onPillClick=(clickedUser)=>{
    const updatedUsers=selectedUsers.filter(user => user.email !== clickedUser?.email);
    setSelectedUsers(updatedUsers);
  }

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        if (inputTerm.trim() === "") {
          setSuggestions([]);
          return;
        }
        let resp = await fetch(
          `https://dummyjson.com/users/search?q=${inputTerm}`
        );
        let users = await resp.json();
        setSuggestions(users);
      };
      fetchUsers();
    } catch (e) {
      console.log("API error occured");
    }
  }, [inputTerm]);

  return (
    <>
      <div className="multiSearch">
        <div className="multiSearch__selectedUsers">
          {selectedUsers.map((user) => (
            <Pill
              image={user?.image}
              fullName={`${user?.firstName} ${user?.lastName}`}
              onPillClick={()=>onPillClick(user)}
            />
          ))}
          <input
            ref={inputRef}
            className="multiSearch__input"
            type="text"
            value={inputTerm}
            onChange={(e) => setInputTerm(e.target.value)}
            placeholder="Search for a user..."
          />
        </div>
        {
          suggestions?.users?.length > 0 && (
            <ul className="multiSearch__list">
            {suggestions?.users &&
              suggestions?.users.map((user) => {
                return (
                  <li
                    key={user?.email}
                    onClick={() => {
                      onUserSelect(user);
                    }}
                  >
                    <img src={user?.image} alt="user-image" />
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                  </li>
                );
              })}
          </ul>  
          )
        }
            
      </div>
    </>
  );
}

export default App;
