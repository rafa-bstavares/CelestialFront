import { createContext, useState, Dispatch, SetStateAction } from "react";

type TiposContextoAviso = {   
    setTemAviso: Dispatch<SetStateAction<boolean>>,
    temAviso: boolean,
    setTemAvisoLogin: Dispatch<SetStateAction<boolean>>,
    temAvisoLogin: boolean,
    textoAviso: string,
    setTextoAviso: Dispatch<SetStateAction<string>>,
    setAbrirModalCertezaChamada: Dispatch<SetStateAction<boolean>>,
    setAbrirModalRecarregar: Dispatch<SetStateAction<boolean>>,
    abrirModalCertezaChamada: boolean,
    abrirModalRecarregar: boolean,
    valorMinModal: number,
    setValorMinModal: Dispatch<SetStateAction<number>>,
    setAbrirModalEmail: Dispatch<SetStateAction<boolean>>,
    abrirModalEmail: boolean,
}

export const ContextoAviso = createContext<TiposContextoAviso>({
    setTemAviso: () => {},
    temAviso: false,
    setTemAvisoLogin: () => {},
    temAvisoLogin: false,
    setAbrirModalCertezaChamada: () => {},
    setAbrirModalRecarregar: () => {},
    abrirModalCertezaChamada: false,
    abrirModalRecarregar: false,
    textoAviso: "",
    setTextoAviso: () => {},
    setValorMinModal: () => {},
    valorMinModal: 1,
    setAbrirModalEmail: () => {},
    abrirModalEmail: false,
    
} as TiposContextoAviso)


export const AvisoProvider = ({children}: {children: React.ReactNode}) => {

    const [temAviso, setTemAviso] = useState<boolean>(false)
    const [temAvisoLogin, setTemAvisoLogin] = useState<boolean>(false)
    const [abrirModalCertezaChamada, setAbrirModalCertezaChamada] = useState<boolean>(false)
    const [abrirModalEmail, setAbrirModalEmail] = useState<boolean>(false)
    const [abrirModalRecarregar, setAbrirModalRecarregar] = useState<boolean>(false)
    const [textoAviso, setTextoAviso] = useState<string>("")
    const [valorMinModal, setValorMinModal] = useState<number>(1)


    return (
        <ContextoAviso.Provider value={{
            temAviso,
            setTemAviso,
            temAvisoLogin,
            setTemAvisoLogin,
            textoAviso,
            setTextoAviso,
            abrirModalCertezaChamada,
            abrirModalRecarregar,
            setAbrirModalCertezaChamada,
            setAbrirModalRecarregar,
            valorMinModal,
            setValorMinModal,
            setAbrirModalEmail,
            abrirModalEmail,
        }}>
            {children}
        </ContextoAviso.Provider>
    )
}