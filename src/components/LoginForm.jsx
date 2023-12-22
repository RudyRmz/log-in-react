import clsx from "clsx"
import { useState } from "react"
import { useEffect } from "react"

export default function LoginForm (){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isFailed, setIsFailed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
        const token =  window.localStorage.getItem("token")

        if(token){
            setIsLoggedIn(true)
        }
    }, [])

    const onSubmit = (event)=>{
        event.preventDefault();
        setIsLoading(true)
        //console.log(userName, password)
        fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password: password
            }),
        })
        .then((response)=> response.json())
        .then((responseJson)=>{
            setIsLoading(false)
            if (!responseJson.token){
                setIsFailed(true)
                return
            } 
            console.log("token:", responseJson.token);
            window.localStorage.setItem("token", responseJson.token)
            setIsLoggedIn(true)
            //const userToken = window.localStorage.getItem("token")

            setIsFailed(false)
        })
        .catch((error)=> console.error("login failed: ". error))
    }

    if(isLoggedIn){
        // Obtener el token de alguna fuente (por ejemplo, localStorage)
const token = localStorage.getItem("token");

// Dividir el token en sus partes: encabezado, payload, firma
const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');

// Decodificar el payload (parte central) del token
const decodedPayload = atob(encodedPayload);

// Parsear el JSON del payload decodificado
const payloadObject = JSON.parse(decodedPayload);

// Acceder a los datos en el payload
console.log(payloadObject);

const userFirstName =  payloadObject.firstName

        return(
            <article>
                <h1 className={clsx(
                    " rounded-lg p-5",
                    " bg-white",
                    "font-bold text-[50px]"
                )}>Welcome {userFirstName} 👋</h1>
                
            </article>
        )
    }

    return(
        <form className={clsx(
            " border border-white/50 p-5 rounded-lg bg-white",
            "flex flex-col gap-5 justify-center", 
            "w-full max-w-[500px] h-[500px]",
            {" border-red-500": isFailed}
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

            <input type="submit" 
            value={isLoading ? "Ingresando..." : "Log in"} 
            disabled = {isLoading}
            className={clsx(
                " bg-blue-700 text-white w-full p-2 font-bold rounded-lg",
                "cursor-pointer",
                "hover:bg-blue-500"
            )}/>

            {/* {isFailed && <p className={clsx(" text-red-500 items-center")}>Datos invalidos</p>} */}
            <p className={clsx(" text-red-500 font-semibold", { hidden: !isFailed})}>Datos invalidos</p>
        </form>
    )
}