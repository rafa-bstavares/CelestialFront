import { Dispatch, SetStateAction, useEffect, useState } from "react"
import setaSeletor from "../../assets/images/setaSeletor.svg"
import CartaBaralho from "../CartaBaralho/CartaBaralho"
import xis from "../../assets/images/xisFechar.svg"


type tipoBaralho = {
    nomeBaralho: string,
    urlsCartas: string[]
}

type Props = {
    baralhos: tipoBaralho[],
    cartasSelecionadas: string[],
    setCartasSelecionadas: Dispatch<SetStateAction<string[]>>,
    enviarFn: () => void,
    setQueroCartas: Dispatch<SetStateAction<boolean>>
}

export default function ModalBaralhos({baralhos, cartasSelecionadas, setCartasSelecionadas, enviarFn, setQueroCartas}: Props){



    const [baralhoSelecionado, setBaralhoSelecionado] = useState<string>("")
    const [rodaSeta, setRodaSeta] = useState<boolean>(false)
    const [mostrarBaralhos, setMostrarBaralhos] = useState<boolean>(false)
    const [baralhosUrls, setBaralhosUrls] = useState<string[]>([])



    function selecionouBaralho(index: number){
        console.log("baralho")
        console.log(baralhos)
        console.log("index")
        console.log(index)
        setBaralhosUrls(baralhos[index].urlsCartas)
    }

    
    function trocarMostrarBaralhos(){
        setMostrarBaralhos(!mostrarBaralhos)
        setRodaSeta(!rodaSeta)
    }

    useEffect(() => {
        if(baralhos.length > 0){
            setBaralhoSelecionado(baralhos[0].nomeBaralho)
            setBaralhosUrls(baralhos[0].urlsCartas)
        }
    }, [baralhoSelecionado])

    useEffect(() => {
        console.log("CONSOLE DOS BARALHOPS")
        console.log(baralhosUrls)
    }, [baralhosUrls])


    return(
        <div className="absolute inset-0 w-full bg-white/90 flex justify-center items-center">
            <div className="w-[80%] h-[90%] bg-roxoPrincipal rounded-md flex flex-col gap-4 items-center p-4 relative">
                <div className="absolute top-0 -right-4 translate-x-full w-10" onClick={() => setQueroCartas(false)}>
                    <img src={xis} alt="xis fechar modal cartas" className="w-full h-auto" />
                </div>
                <div className="flex flex-col w-full py-4">
                    <div className="flex items-center justify-between px-4 py-2 cursor-pointer min-w-[15vw] rounded-xl border-2 border-white border-solid border-spacing-6" onClick={() => {trocarMostrarBaralhos()}}>
                        {
                            baralhoSelecionado ? 
                            baralhoSelecionado 
                            :
                            "Selecione um baralho..."                                
                        }
                        <img src={setaSeletor} alt="seta seletor" className={`h-3 w-3 ${rodaSeta ? "rotate-180": "rotate-0"} transition-all ease-linear duration-500`}/>
                    </div>
                    <div className={`grid ${mostrarBaralhos ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} p-2 rounded-xl transition-all duration-500 ease-linear`}>
                        <div className="grid overflow-hidden">
                            {baralhos.map((item, index) => <div onClick={() => selecionouBaralho(index)} className="px-4 py-2 rounded-md hover:bg-roxoPrincipal cursor-pointer">{item.nomeBaralho}</div>)}
                        </div>
                    </div>
                </div>

                <div className='bg-white/30 backdrop-blur-md p-4 grid grid-cols-4 gap-4 items-center justify-items-center h-full overflow-y-scroll w-4/5'>
                    {
                        baralhosUrls && 
                        baralhosUrls.map((item, index) => {
                        return <CartaBaralho urlImg={`http://localhost:8080/images/${item}`} cartasSelecionadas={cartasSelecionadas} setCartasSelecionadas={setCartasSelecionadas} idxCarta={index} />
                        })
                    }
                </div>

                <button onClick={enviarFn} className="p-4 cursor-pointer rounded-md text-white bg-roxoPrincipal">
                    Enviar cartas
                </button>

            </div>
        </div>
    )
}