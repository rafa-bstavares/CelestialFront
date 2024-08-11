import { useState } from "react";
import SetaSeletor from "../../assets/images/setaSeletor.svg"


export default function CorpoBanner(){

    const [mostrarSignos, setMostrarSignos] = useState<boolean>(false)
    const [rodaSeta, setRodaSeta] = useState<boolean>(false)
    const [signoSelecionado, setSignoSelecionado] = useState<string>("")
    const [horoscDia, setHoroscDia] = useState<string>("")

    const signos = [
        "Áries",
        "Touro",
        "Gêmeos",
        "Câncer",
        "Leão",
        "Virgem",
        "Libra",
        "Escropião",
        "Sagitário",
        "Capricórnio",
        "Aquário",
        "Peixes"
    ]

    const signosApi = [
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces"
    ]

    function trocarMostrarSignos(){
        setMostrarSignos(!mostrarSignos)
        setRodaSeta(!rodaSeta)
    }

    async function selecionouSigno(index: number, signo: string){
        setSignoSelecionado(signo)
        trocarMostrarSignos()
        const url = 'https://horoscope-astrology.p.rapidapi.com/horoscope?day=today&sunsign=' + signosApi[index];
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'faeb8f2f7amshe9bfe41a55016bbp1bdc7ajsnaaed12c3fe11',
                'x-rapidapi-host': 'horoscope-astrology.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if(result){
                if(result.horoscope){
                    setHoroscDia(result.horoscope)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-1 p-paddingSecaoGeral w-screen aspect-video">
            <div className="flex-[2]">

            </div>
            <div className="flex-1 flex flex-col justify-center">
                <div className="px-8 py-6 bg-black/20 backdrop-blur-sm text-white flex flex-col gap-2 items-center rounded-xl max-h-1/2">
                    <div className=" italic text-center font-fontePrincipal text-textoH3">
                        Horoscopo do dia
                    </div>
                    <div className="flex flex-col w-full py-4">
                        <div className="flex items-center justify-between px-4 py-2 cursor-pointer min-w-[15vw] rounded-xl border-2 border-white border-solid border-spacing-6" onClick={() => {trocarMostrarSignos()}}>
                            {
                                signoSelecionado ? 
                                signoSelecionado 
                                :
                                "Selecione seu signo..."                                
                            }
                            <img src={SetaSeletor} alt="seta seletor" className={`h-3 w-3 ${rodaSeta ? "rotate-180": "rotate-0"} transition-all ease-linear duration-500`}/>
                        </div>
                        <div className={`grid ${mostrarSignos ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} p-2 rounded-xl transition-all duration-500 ease-linear`}>
                            <div className="grid overflow-hidden">
                                {signos.map((item, index) => <div onClick={() => selecionouSigno(index, item)} className="px-4 py-2 rounded-md hover:bg-roxoPrincipal cursor-pointer">{item}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="p-2 text-center">
                            {horoscDia}
                    </div>
                </div>
            </div>
        </div>
    )
}