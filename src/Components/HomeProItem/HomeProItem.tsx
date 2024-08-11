import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal"
import BotaoSecundario from "../BotaoSecundario/BotaoSecundario"

type Props = {
    nome: string,
    descricaoMenor: string,
    status: string,
    valorMin: number,
    img: string
}

export default function HomeProItem({nome, descricaoMenor, status, valorMin, img}: Props){



    function irParaChat(){

    }

    function irPerfil(){

    }

    return (
        <div className="flex flex-col py-10 lg:px-20 px-4 rounded-md border-white border-solid border-2 items-center gap-4 text-white bg-black/10 backdrop-blur-sm">
            <div className="w-52 h-52 rounded-md overflow-hidden flex justify-center items-center">
                <img className="object-cover w-full h-52 object-top" src={`http://localhost:8080/images/${img}`} alt="imagem-profissional"/>
            </div>
            <div className="font-bold text-2xl text-center">
                {nome}
            </div>
            <div className="text-lg"> 
                {descricaoMenor}
            </div>
            <div className={`rounded-md text-sm text-center p-1 border-1 border-solid ${status == "online" ? "text-green-500 border-green-500" : (status == "offline" ? "text-red-500 border-red-500" : "text-orange-500 border-orange-500")}`}>
                {status}
            </div>
            <div className="w-full"> 
                <BotaoPrincipal onClickFn={irParaChat} txt={`Iniciar consulta R$${valorMin}/min`}/>
            </div>
            <div className="w-full">
                <BotaoSecundario onClickFn={irPerfil} txt={`Ver perfil`}/>
            </div>
        </div>
    )
}