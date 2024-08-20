import { useContext, useEffect, useState } from "react"
import { ContextoAviso } from "../../Contexts/ContextoAviso/ContextoAviso"
import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal"
import BotaoSecundario from "../BotaoSecundario/BotaoSecundario"
import { ContextoUsuario } from "../../Contexts/ContextoUsuario/ContextoUsuario"
import { ContextoLogin } from "../../Contexts/ContextoLogin/ContextoLogin"
import { socket } from "../../socket"
import { useNavigate } from "react-router-dom"
//import ModalChamando from "../ModalChamando/ModalChamando"
//import { socket } from "../../socket"
import { ContextoProfissionais } from "../../Contexts/ContextoProfissionais/ContextoProfissionais"


export default function ModalCertezaChamada(){

    const {setTemAviso, setTextoAviso, valorMinModal, setAbrirModalCertezaChamada} = useContext(ContextoAviso)
    //const {usuario, setSalaAtual, idMeuAtendente, setPrecoTotalConsulta, setTempoConsulta, loading, setLoading} = useContext(ContextoUsuario)
    const {setUsuarioLogado} = useContext(ContextoLogin)
    const {nomeProModTempo} = useContext(ContextoProfissionais)
    const {usuario, idMeuAtendente, setSalaAtual, setLoading} = useContext(ContextoUsuario)


    /*const [temErro, setTemErro] = useState<boolean>(false)
    const [textoErro, setTextoErro] = useState<string>("") SE DER RUIM TIRA ESSE COMENTARIO*/
    const [tempoConsultaVar, setTempoConsultaVar] = useState<number>(5)
    const [precoConsultaVar, setPrecoConsultaVar] = useState<number>(tempoConsultaVar * valorMinModal)
    const [respAtendente, setRespAtendente] = useState<string>("")


    const navigate = useNavigate()

    function efetivarPedido(){
        if(usuario.saldo >= 5){
            //criar sala e enviar o preco consultaVar pra setar os cronômetros
            fetch("http://localhost:8080/confereSalas", {
                method: "POST",
                headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : "", "Content-Type": "application/json"},
                body: JSON.stringify({
                    idProfissional: idMeuAtendente
                })
            }).then(res => res.json()).then(data => {
            if(data.codigo !== 200){
                setTemAviso(true)
                if(data.detalhes){
                    setTextoAviso(data.detalhes)
                }else{
                    setTextoAviso("Ocorreu um erro, por favor tente novamente")
                }
            }else if(data.codigo == 200){
                setAbrirModalCertezaChamada(false)
                switch(data.detalhes){
                    case "criar sala":
                        console.log("caiu no criar sala")
                        setUsuarioLogado(true)
                        //ENVIAR PARA MODAL "CHAMANDO ATENDENTE....."
                        /*criarSala()*/
                        socket.emit("adicionarNaSala", {room: idMeuAtendente.toString()})
                        socket.emit("chamarAtendente", {idProfissional: idMeuAtendente, nomeCliente: usuario.nome, idCliente: usuario.id})
                        

                        setLoading(true)
                        break

                    case "sala existente":
                        console.log("caiu no sala existente")
                        setSalaAtual(Number(data.res))
                        navigate("/chat")
                        break

                    case "profissional ocupado":
                        console.log("profissional ocupado")
                        setTemAviso(true)
                        setTextoAviso("O profissional se encontra ocupado no momento. Por favor, tente novamente mais tarde.")
                        break

                    case "profissional não disponível":
                        console.log("profissional não disponivel")
                        setTemAviso(true)
                        setTextoAviso("O profissional não se encontra disponível. Por favor, tente novamente mais tarde.")
                        break
                }
            }else{
                setTemAviso(true)
                setTextoAviso("Ocorreu um erro, por favor tente novamente")
            }
        }).catch(() => {
            setTemAviso(true)
            setTextoAviso("ocorreu algum erro, por favor, tente novamente")
        })

        }else{
            //dar opção para ele adicionar saldo ou fazer a consultaVar com o tempo sugerido que ele consegue
            setTemAviso(true)
            setTextoAviso("Para iniciar consulta, seu saldo deve ser, no mínimo, 5 reais.")
            setAbrirModalCertezaChamada(false)
        }
    }

    function aoCancelar(){
        setAbrirModalCertezaChamada(false)
    }

    useEffect(() => {
        console.log(nomeProModTempo)
    }, [])

    return(
        <div className="fixed bg-white/90 h-screen w-full top-0 left-0 flex justify-center items-center">
            <div className="flex flex-col gap-2 lg:gap-4 px-4 lg:px-8 py-3 lg:py-6 bg-cinzaAzul950 w-[90%] lg:w-1/2 rounded-md text-white">
                <div className="w-2/3 lg:w-1/4 self-center">
                    
                </div>
                <div className="self-center text-xl lg:text-3xl font-bold">Deseja abrir um chat com {nomeProModTempo}?</div>
                {/*
                    loading && 
                    <ModalChamando/>
                */}
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 self-center mt-3 lg:mt-5">
                    <BotaoPrincipal onClickFn={efetivarPedido} txt="Ir para consulta"/>
                    <BotaoSecundario onClickFn={aoCancelar} txt="Cancelar"/>
                </div>
            </div>
        </div>
    )
}