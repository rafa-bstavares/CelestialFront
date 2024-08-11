import { createContext, useState, Dispatch, SetStateAction } from "react";

type TiposContextoLogin = {   
    setAtendenteLogado: Dispatch<SetStateAction<boolean>>,
    setUsuarioLogado: Dispatch<SetStateAction<boolean>>,
    setAdmLogado: Dispatch<SetStateAction<boolean>>,
    setAbrirModalLogUsuario: Dispatch<SetStateAction<boolean>>,
    setAbrirModalCadastroUsuario: Dispatch<SetStateAction<boolean>>,
    setAbrirModalRedefinir: Dispatch<SetStateAction<boolean>>,
    atendenteLogado: boolean,
    usuarioLogado: boolean,
    admLogado: boolean,
    abrirModalLogUsuario: boolean,
    abrirModalCadastroUsuario: boolean,
    abrirModalRedefinir: boolean,
}

export const ContextoLogin = createContext<TiposContextoLogin>({
    setAtendenteLogado: () => {},
    setUsuarioLogado: () => {},
    setAdmLogado: () => {},
    setAbrirModalLogUsuario: () => {},
    setAbrirModalCadastroUsuario: () => {},
    setAbrirModalRedefinir: () => {},
    atendenteLogado: false,
    usuarioLogado: false,
    admLogado: false,
    abrirModalLogUsuario: false,
    abrirModalCadastroUsuario: false,
    abrirModalRedefinir: false,
} as TiposContextoLogin)


export const LoginProvider = ({children}: {children: React.ReactNode}) => {

    const [atendenteLogado, setAtendenteLogado] = useState<boolean>(false)
    const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false)
    const [admLogado, setAdmLogado] = useState<boolean>(false)
    const [abrirModalLogUsuario, setAbrirModalLogUsuario] = useState<boolean>(false)
    const [abrirModalCadastroUsuario, setAbrirModalCadastroUsuario] = useState<boolean>(false)
    const [abrirModalRedefinir, setAbrirModalRedefinir] = useState<boolean>(false)



    return (
        <ContextoLogin.Provider value={{
            atendenteLogado,
            usuarioLogado,
            admLogado,
            setAtendenteLogado,
            setUsuarioLogado,
            setAdmLogado,
            setAbrirModalLogUsuario,
            setAbrirModalCadastroUsuario,
            setAbrirModalRedefinir,
            abrirModalLogUsuario,
            abrirModalCadastroUsuario,
            abrirModalRedefinir
        }}>
            {children}
        </ContextoLogin.Provider>
    )
}