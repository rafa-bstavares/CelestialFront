import { useIntersection } from "../../CustomHooks/useIntersection/useIntersection"
import { useEffect, useRef, useState } from "react";
type Props = {
    imgCarta: string,
    index: number
}

export default function Carta({imgCarta, index}: Props){

    const [numOpacity, setNumOpacity] = useState<number>(0)
    const [tempoInt, setTempoInt] = useState<number>(0)
    const triggerRef = useRef(null);
    const isVisible = useIntersection({element:triggerRef, rootMargin:"-200px"})
    const [apareceu, setApareceu] = useState<boolean>(false)


    function callbackFn(){
        console.log("carta " + (index + 1) + " apareceu na tela") 
        setApareceu(true)
        switch(index % 3){
            case 0:
                setTempoInt(1)
                break

            case 1:
                setTempoInt(500)
                break

            case 2: 
                setTempoInt(1000)
                break
            
        }

    }

    useEffect(() => {
        if(apareceu){
            setTimeout(() => {
                setNumOpacity(1)
            }, tempoInt)
        }
    }, [tempoInt])

    useEffect(() => {
        if (isVisible) {
         callbackFn() // Trigger a function when the div is visible on view port
        }
      }, [callbackFn, isVisible]);


    return (
        <img style={{animationFillMode: "forwards"}} ref={triggerRef} src={imgCarta} className={`${numOpacity? "animate-entrarCarta" : ""} opacity-1  w-4/5 h-auto`}/>
    )
}