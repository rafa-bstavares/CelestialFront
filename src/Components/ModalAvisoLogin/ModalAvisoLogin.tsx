import { useNavigate } from "react-router-dom"
import imgAviso from "../../assets/images/iconeAviso.png"
import { useContext } from "react"
import { ContextoAviso } from "../../Contexts/ContextoAviso/ContextoAviso"



export default function ModalAvisoLogin(){

    const navigate = useNavigate()
    const {setTemAvisoLogin} = useContext(ContextoAviso)

    function irLogin(){
        navigate("/loginUsuario")
    }

    function irCadastro(){
        navigate("/cadastroUsuario")
    }

    function fecharModal(){
        setTemAvisoLogin(false)
    }

    return(
        <div className="fixed top-0 left-0 h-screen w-screen bg-black/80 flex flex-col justify-center items-center gap-10 z-50 p-2">
            <img className="w-1/6" src={imgAviso} alt="imagem aviso" />
            <div className="text-xl text-white text-center">Antes é necessário que você faça o login</div>
            <div className="flex gap-4">
                <button className="px-4 py-2 rounded-md bg-white text-black" onClick={irLogin}>Login</button>
                <button className="px-4 py-2 rounded-md bg-white text-black" onClick={irCadastro}>Se cadastrar</button>
                <button className="px-4 py-2 rounded-md bg-white text-black" onClick={fecharModal}>Fechar</button>
            </div>
        </div>
    )
}