import { useEffect, useReducer, useRef, useState } from "react";
import Examples from "./components/Examples";
import "./assets/css/app.css";
import submit_button from "./assets/svg/submit.svg";
import Conversation from "./components/Conversation";

function reducer(state, action) {
  switch(action.type) {
    case "typing":
      if (action.payload === ""){
        return {
          ...state,
          text: action.payload,
          disabled: true
        }
      }

      return {
        ...state,
        text: action.payload,
        disabled: false
      }
    
      case "conversation":
      return {
        ...state,
        disabled: true,
        conversation: action.payload.conversation,
        data: action.payload.data,
        text: "",
        display_conversation: {display: "grid"},
        display_example: {display: "none"},
        
      } 

    case "clear": 
      return {
        ...state,
        conversation: []
      }
  }
}

const default_state = {
  text: "",
  disabled: true,
  data: "",
  conversation: JSON.parse(localStorage.getItem("conversation")) || [],
  display_conversation: {display: "none"},
  display_example: {display: "grid"}
};




function App() {
  const [state, dispatch] = useReducer(reducer, default_state);


  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("https://api-ai.onrender.com/response_msg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: state.text
      })
    });

    try{
      const data = await response.json();

      if(response.ok){
        console.log(data);
        saveToLocalstorage(data);
        dispatch({ type: "conversation", payload: {
            conversation: JSON.parse(localStorage.getItem("conversation")),
            data: data
        }});

      }
    } catch(error) {
      console.log(error);
    }
  }

  function saveToLocalstorage(data) {
    let conversation = [];
    conversation = JSON.parse(localStorage.getItem("conversation")) || [];
    conversation.push([state.text, data.response]);
    localStorage.setItem("conversation", JSON.stringify(conversation));
  }

  function clearConversation() {
    localStorage.removeItem("conversation");
    dispatch({ type: "clear"})
  }



  return (
      <div className="container">
        <h1
          style={state.display_example}
        >Chat</h1> 
        <Examples display_example={state.display_example} />
        <Conversation 
          display_conversation={state.display_conversation}
          conversation={state.conversation}
        />  

        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" onChange={(e) => dispatch({type: "typing", payload: e.target.value})} value={state.text} />
            <button disabled={state.disabled}><img src={submit_button}/></button>
          </label>
        </form>


        <button style={state.display_conversation} type="button" onClick={clearConversation}>clear conversation</button>
      </div>
  )
}

export default App
