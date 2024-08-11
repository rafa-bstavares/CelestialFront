import { useContext, useEffect, useState } from "react"
import Login from "../Login/Login"
import { ContextoLogin } from "../../Contexts/ContextoLogin/ContextoLogin"
import { Link, Outlet } from "react-router-dom"
import { ContextoAviso } from "../../Contexts/ContextoAviso/ContextoAviso"
import ModalAviso from "../ModalAviso/ModalAviso"


export default function AdmGeral(){
    const {setTemAviso, setTextoAviso, temAviso} = useContext(ContextoAviso)
    const {admLogado, setAdmLogado} = useContext(ContextoLogin)

    useEffect(() => {
        fetch("http://localhost:8080/confereTokenAdmGeral", {
            headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}
        }).then(res => res.json()).then(data => {
            if(data){
                data
                if(data.codigo == 200){
                    setAdmLogado(true)
                }else{
                    setAdmLogado(false)
                    localStorage.setItem("authToken", "") 
                }
            }
        })
    }, [])

    const menuAdm = [
        {texto: "Cadastros", link: "/admGeral/Cadastros"}
    ]

    return(
        <div className="relative">
            {
                admLogado?
                <div className="min-h-screen bg-[#300b6a]">
                    <div className="flex h-24 bg-white/30 backdrop-blur-sm w-full">
                        <div>
                            <img src="" alt="" />
                        </div>
                        <div className="flex-1 flex justify-center h-full">
                            <div className="flex h-full">
                                {menuAdm.map(item => (
                                    <Link to={item.link}>
                                        <div className="h-full px-8 text-textoPadrao text-white drop-shadow-sm flex justify-center items-center hover:bg-white/40 transition-colors">{item.texto}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Outlet/>
                </div>
                :
                <Login tipoLogin="Adm"/>
            }
            {
                temAviso &&
                <ModalAviso/>
            }
        </div>
    )
}