import clsx from "clsx"
import { useState } from "react"

export default function LoginForm (){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = (event)=>{
        event.preventDefault();
        console.log(userName, password)
    }

    return(
        <form className={clsx(
            " border border-white/50 p-5 rounded-lg bg-white",
            "flex flex-col gap-5 justify-center", 
            "w-full max-w-[500px] h-[500px]" 
        )}
        onSubmit={onSubmit}
        >
            <div className=" flex flex-col justify-center items-center gap-2"> 
            <img className=" max-w-[120px]" src="https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png" alt="" />
            <h1 className=" font-bold text-[40px]">Welcome back 👋</h1>
            <h2 className=" font-medium text-lg">Please enter your details</h2>
            </div>
            
            <input type="text" className={clsx("p-2 rounded-lg bg-white/60 border-2 border-black")} 
            onChange={(event)=>setUserName(event.target.value)}
            value={userName}
            placeholder="Username"
            />

            <input type="password" className={clsx("p-2 rounded-lg bg-white/60 border-2 border-black")}
            onChange={(event)=>setPassword(event.target.value)}
            value={password}
            placeholder="Password"
            />

            <input type="submit" value="Log in" className={clsx(
                " bg-blue-700 text-white w-full p-2 font-bold rounded-lg",
                "cursor-pointer",
                "hover:bg-blue-500"
            )}/>
        </form>
    )
}