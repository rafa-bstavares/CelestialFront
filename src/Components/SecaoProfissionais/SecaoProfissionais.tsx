import { useContext, useEffect, useState, useRef } from "react"
import fundoProfissionais from "../../assets/images/Parte Profissionais03.mp4"
import { ContextoAviso } from "../../Contexts/ContextoAviso/ContextoAviso"
import HomeProItem from "../HomeProItem/HomeProItem"
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react";
import { socket } from "../../socket";


export default function SecaoProfissionais(){
    const {setTemAviso, setTextoAviso} = useContext(ContextoAviso)

    type TipoObjProfissionais = {
        foto: string,
        nome: string,
        id: number,
        email: string,
        descricaoMenor: string,
        descricaoMaior: string,
        status: string,
        valorMin: number,
        percentualPro: number
    }

    const [profissionais, setProfissionais] = useState<TipoObjProfissionais[]>([])


    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(ScrollTrigger) 

    socket.on("mudStatus", (data) => {
        const cloneInfos = [...profissionais]
        const idxPro =  cloneInfos.findIndex((item) => item.id == data.id)
        if(idxPro >= 0 ){
            cloneInfos[idxPro].status = data.status
            setProfissionais(cloneInfos)
        }
    })

    const container = useRef(null);

    useGSAP(() => {
        // gsap code here...
        gsap.to(".el", {
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom bottom",
                pin: ".el"
            }
        }); // <-- automatically reverted
      
      }, { scope: container }) // <-- scope for selector text (optional)

    useEffect(() => {
        fetch("http://localhost:8080/pegarInfoProfissionaisAberto").then(res => res.json()).then(data => {
            if(data){
                if(data.codigo == 200){
                    console.log(data)
                    setProfissionais(data.res)
                }else{
                    setTemAviso(true)
                    setTextoAviso("ocorreu um erro. Por favor, tente novamente.")
                }
            }
        }).catch(() => {
            setTemAviso(true)
            setTextoAviso("ocorreu um erro. Por favor, tente novamente e verifique sua conexão com a internet.")
        })
    }, [])

    return (
        <div className="relative overflow-y-hidden h-[200vh]" ref={container}>
            <div className="el w-screen h-screen absolute top-0 bg-fundoEstrelado right-0 flex justify-end">
                <video autoPlay={true} muted={true} loop={true} src={fundoProfissionais} className="h-screen w-auto"></video>
            </div>
            <div className="w-full min-h-screen lg:grid lg:grid-cols-3 lg:justify-items-center items-center flex flex-col lg:gap-10 gap-4">
                {
                    profissionais.map(item => <HomeProItem id={item.id} descricaoMenor={item.descricaoMenor} img={item.foto} nome={item.nome} status={item.status} valorMin={item.valorMin}/>)
                }
            </div>
        </div>
    )
}