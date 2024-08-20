import carregandoGif from "../../assets/images/carregando.gif"
import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal"
import BotaoSecundario from "../BotaoSecundario/BotaoSecundario"
import toque from "../../assets/sounds/old-style-phone-ringer-37761.mp3"
import { useContext, useEffect, useRef } from "react"
import { socket } from "../../socket"
import { ContextoProfissionais } from "../../Contexts/ContextoProfissionais/ContextoProfissionais"
import { ContextoUsuario } from "../../Contexts/ContextoUsuario/ContextoUsuario"

type Props = {
    tipoModal: "atendente" | "usuario",
    nomeCliente?: string,
    idUsuario?: number
}

export default function ModalCarregando({tipoModal, nomeCliente, idUsuario}: Props){

    const {perfilProAtual} = useContext(ContextoProfissionais)

    const audioRef = useRef<HTMLAudioElement>(null)

    const tmout = setTimeout(() => {
        audioRef.current?.pause()
        if(idUsuario){
            socket.emit("respostaChamarAtendente", {msg: "Rejeitado", idCliente: idUsuario, idProfissional: perfilProAtual.id})
        }
    }, 59000)

    useEffect(() => {
        if(tipoModal == "atendente"){
            audioRef.current?.play()
        }
    }, [])

    function rejeitarChamada(){
        audioRef.current?.pause()
        clearTimeout(tmout)
        if(idUsuario){
            socket.emit("respostaChamarAtendente", {msg: "Rejeitado", idCliente: idUsuario, idProfissional: perfilProAtual.id})
        }
    }

    function aceitarChamada(){
        audioRef.current?.pause()
        if(idUsuario){
            socket.emit("respostaChamarAtendente", {msg: "Aceitar", idCliente: idUsuario, idProfissional: perfilProAtual.id})
        }
    }



    const {usuario, idMeuAtendente} = useContext(ContextoUsuario)

    function rejeitarChamadaUsuario(){
        console.log("rejeitando")
        console.log(idMeuAtendente)
        socket.emit("respostaChamarAtendente", {msg: "Rejeitado", idCliente: usuario.id, idProfissional: idMeuAtendente})
    }

    return(
        <div className="fixed h-screen w-full top-0 z-50 bg-gradient-to-r from-azulFundoChat to-roxoFundoChat flex justify-center items-center font-poppins ">
            <div className="h-[90vh] w-[80%] bg-white rounded-xl flex flex-col overflow-hidden items-center justify-center gap-10">
                <img src={carregandoGif} alt="carregando" className="w-[90px] h-auto"/>
                <div className="text-center text-azulTextoChat lg:text-textoH3">
                    {tipoModal == "usuario" ? "Chamando seu atendente" : nomeCliente ? `${nomeCliente} quer fazer uma consulta com você!` : "Chamado de consulta"}
                </div>
                {
                    tipoModal == "usuario" ?
                    <div className="w-full flex justify-center">
                        <BotaoPrincipal txt="Cancelar Chamada" onClickFn={rejeitarChamadaUsuario}/>
                    </div>
                    :
                    <div className="w-full flex justify-center">
                        <BotaoSecundario txt="Recusar" onClickFn={rejeitarChamada}/>
                        <BotaoPrincipal txt="Aceitar" onClickFn={aceitarChamada}/>
                    </div>
                }
            </div>
            <audio loop ref={audioRef} src={toque} className="absolute opacity-0"></audio>
        </div>
    )
}