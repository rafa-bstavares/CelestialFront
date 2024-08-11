import { useContext, useEffect, useState } from "react";
import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal";
import { ContextoAviso } from "../../Contexts/ContextoAviso/ContextoAviso";
import ModalAviso from "../ModalAviso/ModalAviso";
import { useNavigate } from "react-router-dom";
import { ContextoUsuario } from "../../Contexts/ContextoUsuario/ContextoUsuario";




export default function cadastroUsuario(){
    const {setTemAviso, setTextoAviso, temAviso} = useContext(ContextoAviso)
    const {setCadastrouAgora} = useContext(ContextoUsuario)

    const [email, setEmail] = useState<string>("")
    const [email2, setEmail2] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [senha2, setSenha2] = useState<string>("")
    const [nome, setNome] = useState<string>("")
    const [dia, setDia] = useState<string>("")
    const [mes, setMes] = useState<string>("")
    const [ano, setAno] = useState<string>("")

    const navigate = useNavigate()


    function limparCampos(){
        setSenha("")
        setSenha2("")
        setEmail("")
        setEmail2("")
        setNome("")
    }

    function cadastrarFn(){
        if(email !== email2){
            setTemAviso(true)
            setTextoAviso("os emails devem ser iguais")
        }else{
            if(senha !== senha2){
                setTemAviso(true)
                setTextoAviso("as senhas devem ser iguais")
            }else{
                if(dia.length !== 2 || mes.length !== 2 || ano.length !== 4){
                    setTemAviso(true)
                    setTextoAviso("Na data de nascimento o dia e o mês devem ter exatamente 2 números e o ano 4 números")
                }else{
                    if(email == "" || senha == "" || nome == ""){
                        setTemAviso(true)
                        setTextoAviso("os campos devem ser todos preenchidos")
                    }else{
                        const dataNas = dia + "/"  + mes + "/" + ano
                        fetch("http://localhost:8080/cadastrarUsuario", {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({
                                email,
                                senha,
                                nome,
                                dataNas
                            })
                        }).then(res => res.json()).then(data => {
                            if(data){
                                if(data.codigo !== 200){
                                    setTemAviso(true)
                                    if(data.detalhes){
                                        setTextoAviso(data.detalhes)
                                    }else{
                                        setTextoAviso("ocorreu um erro desconhecido, por favor, tente novamente.")
                                    }
                                }else{
                                    limparCampos()
                                    setCadastrouAgora(true)
                                    navigate("/loginUsuario")
                                }
                            }else{
                                setTemAviso(true)
                                setTextoAviso("ocorreu um erro desconhecido, por favor, tente novamente.")
                            }
                        })
                    }
                }
            }
        }
    }

    useEffect(() => {
        if(dia.length > 2){
            setDia(dia.slice(0, 2))
        }
    }, [dia])

    useEffect(() => {
        if(mes.length > 2){
            setMes(mes.slice(0, 2))
        }
    }, [mes])

    useEffect(() => {
        if(ano.length > 4){
            setAno(ano.slice(0, 4))
        }
    }, [ano])


    return(
        <div className="w-full h-screen bg-fundoLogin bg-cover flex justify-center items-center relative">
            <div className="flex flex-col gap-4 max-h-[90%] lg:w-1/3 w-[90%] px-4 py-8 rounded-lg bg-white/15 backdrop-blur-md items-center">
                <div className="text-textoH3 text-center text-white drop-shadow-md self-center">Cadastre-se</div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-white" htmlFor="nome">Nome:</label>
                        <input className="py-2 px-2 rounded-md bg-white/70 w-full" type="text" id="nome" onChange={(e) => setNome(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-2 text-white">
                        <div>Data de Nascimento</div>
                        <div className="flex">
                            <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center">
                                <label htmlFor="dia">Dia</label>
                                <input className="p-2 w-1/2 outline-none rounded-md bg-white/70 text-black" value={dia} type="number" id="dia" onChange={e => {setDia(e.target.value)}} />
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center">
                                <label htmlFor="mes">Mes</label>
                                <input className="p-2 w-1/2 outline-none rounded-md bg-white/70 text-black" value={mes} type="number" id="mes" onChange={e => {setMes(e.target.value)}} />
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center">
                                <label htmlFor="ano">Ano</label>
                                <input className="p-2 w-1/2 outline-none rounded-md bg-white/70 text-black" value={ano} type="number" id="ano" onChange={e => {setAno(e.target.value)}} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-white" htmlFor="email">Email:</label>
                        <input className="py-2 px-2 rounded-md bg-white/70 w-full" type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-white" htmlFor="email2">Repita o Email:</label>
                        <input className="py-2 px-2 rounded-md bg-white/70 w-full" type="email" id="email2" onChange={(e) => setEmail2(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-white" htmlFor="senha">Senha:</label>
                        <input className="py-2 px-2 rounded-md bg-white/70 w-full" type="password" id="senha" onChange={(e) => setSenha(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-white" htmlFor="senha2">Repita a Senha:</label>
                        <input className="py-2 px-2 rounded-md bg-white/70 w-full" type="password" id="senha2" onChange={(e) => setSenha2(e.target.value)}/>
                    </div>
                    <div className="self-center mt-4"> 
                        <BotaoPrincipal txt="Fazer Login" onClickFn={cadastrarFn}/>
                    </div>                    
                </div>
            </div>
            {
                temAviso &&
                <ModalAviso/>
            }
        </div>  
    )
}