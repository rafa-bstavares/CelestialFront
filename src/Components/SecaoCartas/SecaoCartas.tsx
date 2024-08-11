
import carta from "../../assets/images/cartaAdocamento.png"
import TituloDesc from "../TituloDesc/TituloDesc";
import Carta from "../Carta/Carta";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";



export default function SecaoCartas(){
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(ScrollTrigger) 

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


    const arrCartas = [
        {imgCarta: carta},
        {imgCarta: carta},
        {imgCarta: carta},
        {imgCarta: carta},
        {imgCarta: carta},
        {imgCarta: carta},
        {imgCarta: carta},
        {imgCarta: carta},
        {imgCarta: carta},
        {imgCarta: carta},
    ]


    return (
        <div className="p-paddingSecaoGeral bg-black relative" ref={container}>
            <div className="el absolute bg-fundoEstrelado w-full h-screen top-0 left-0">

            </div>
            <div className="relative z-20 pt-20">
                <TituloDesc titulo="Serviços"/>
                <div className="grid grid-cols-3 place-items-center gap-20">
                    {arrCartas.map((item, index) => <Carta imgCarta={item.imgCarta} index={index} key={item.imgCarta}/>)}
                </div>
            </div>
        </div>
    )
}