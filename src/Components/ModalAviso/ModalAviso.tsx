import { useContext } from "react"
import { ContextoAviso } from "../../Contexts/ContextoAviso/ContextoAviso"
import imgAviso from "../../assets/images/iconeAviso.png"



export default function ModalAviso(){


    const {setTemAviso, textoAviso} = useContext(ContextoAviso)

    function okClique(){
        setTemAviso(false)
    }

    return(
        <div className="fixed top-0 left-0 h-screen w-screen bg-black/80 flex flex-col justify-center items-center gap-10 z-50 p-2">
            <img className="w-1/6" src={imgAviso} alt="imagem aviso" />
            <div className="text-xl text-white text-center">{textoAviso}</div>
            <div className="flex gap-4">
                <button className="px-4 py-2 rounded-md bg-white text-black" onClick={okClique}>OK</button>
            </div>
        </div>
    )
}



