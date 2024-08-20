import { useContext, useState } from "react"
import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal"
import { ContextoLogin } from "../../Contexts/ContextoLogin/ContextoLogin"
import { redirect, useNavigate } from "react-router-dom"
import feliz from "../../assets/images/carinhaFeliz.svg"
import { ContextoUsuario } from "../../Contexts/ContextoUsuario/ContextoUsuario"
import { ContextoAviso } from "../../Contexts/ContextoAviso/ContextoAviso"

type Props = {
    tipoLogin: "Atendente" | "Usuario" | "Adm"
}

export default function Login({tipoLogin}: Props){

    const {setAdmLogado, setAtendenteLogado, setUsuarioLogado} = useContext(ContextoLogin)
    const {cadastrouAgora} = useContext(ContextoUsuario)
    const {setTemAvisoLogin} = useContext(ContextoAviso)

    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")

    const navigate = useNavigate()

    function fazerLoginFn(){
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                senha,
                tipoLogin
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            if(data){
                if(data.codigo == 200){
                    switch(tipoLogin){
                        case "Atendente":
                            localStorage.setItem('authToken', data.token)
                            if(localStorage.getItem("authToken")){
                                setAtendenteLogado(true)
                                redirect("/")
                            }
                            break

                        case "Adm":
                            localStorage.setItem('authToken', data.token)
                            if(localStorage.getItem("authToken")){
                                console.log("deu certo")
                                setAdmLogado(true)
                            }
                            break

                        case "Usuario":
                            localStorage.setItem('authToken', data.token)
                            if(localStorage.getItem("authToken")){
                                setUsuarioLogado(true)
                                setTemAvisoLogin(false)
                                navigate("/")
                            }
                    }
                }else{
                    console.log(data.detalhes)
                }
            }
        })
    }

    return (
        <div className="w-full h-screen bg-fundoLogin bg-cover flex flex-col justify-center items-center">
            {
                cadastrouAgora &&
                <div className="w-full p-10 flex flex-col items-center">
                    <img src={feliz} className="w-14 h-auto animate-bounce" alt="carinha feliz" />
                    <div className="text-center text-white lg:text-xl">Seu cadastro foi realizado com sucesso, agora é só acessar o sistema!</div>
                </div>
            }
            <div className="flex flex-col gap-4 max-h-[90%] lg:w-1/3 w-[90%] px-4 py-8 rounded-lg bg-white/15 backdrop-blur-md items-center">
                <div className="text-textoH3 text-center text-white drop-shadow-md">Login {tipoLogin}</div>
                <div className="flex flex-col gap-1 w-full lg:w-3/5">
                    <label className="text-white" htmlFor="email">Email:</label>
                    <input className="py-2 px-2 rounded-md bg-white/70" type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-1 w-full lg:w-3/5">
                    <label className="text-white" htmlFor="senha">Senha:</label>
                    <input className="py-2 px-2 rounded-md bg-white/70" type="password" id="senha" onChange={(e) => setSenha(e.target.value)}/>
                </div>
                <div className="self-center mt-4"> 
                    <BotaoPrincipal txt="Fazer Login" onClickFn={fazerLoginFn}/>
                </div>
            </div>
        </div>  
    )
}