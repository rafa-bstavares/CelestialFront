
type Props = {
    titulo: string,
    desc?: string
}

export default function TituloDesc({titulo, desc}: Props){
    return(
        <div className="flex flex-col items-center w-full text-white mb-32 relative">
            <div className="text-center font-fontePrincipal text-textoH2">
                {titulo}
            </div>
            {
                desc &&
                <div className="w-full text-center text-textoPadrao opacity-75">
                    {desc}
                </div>
            }
        </div>
    )
}