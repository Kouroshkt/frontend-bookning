import { useState } from "react"

export default function CreateAccount (){
    const [name , setName]=useState("");
    const [family , setFamily]=useState("");
    const [email , setEmail]=useState("");
    const [username , setUsername]=useState("");
    const [password , setPassword]=useState("");
    const [adress , setAdress]=useState("");
    
    return (
        <div>
            <label>Namn</label>
            <input onChange={(event)=>{setName(event.target.value)}}/>
            <label>Efter namn</label>
            <input onChange={(event)=>{setFamily(event.target.value)}}/>
            <label>Email</label>
            <input onChange={(event)=>{setEmail(event.target.value)}}/>
            <label>Användarnamn</label>
            <input onChange={(event)=>{setUsername(event.target.value)}}/>
            <label>Lösenord</label>
            <input onChange={(event)=>{setPassword(event.target.value)}}/>
            <label>Adress</label>
            <input onChange={(event)=>{setAdress(event.target.value)}}/>
            <button type="submit" >Skappa konto</button>
        </div>
    )
}