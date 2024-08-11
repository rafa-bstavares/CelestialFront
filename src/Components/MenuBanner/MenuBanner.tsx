import { useContext, useEffect, useState } from "react";
import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal"
import BotaoSecundario from "../BotaoSecundario/BotaoSecundario"
import {Link} from "react-router-dom"
import { ContextoLogin } from "../../Contexts/ContextoLogin/ContextoLogin";
import { ContextoUsuario } from "../../Contexts/ContextoUsuario/ContextoUsuario";


export default function MenuBanner(){

    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    const {usuarioLogado, setUsuarioLogado} = useContext(ContextoLogin)
    const {usuario} = useContext(ContextoUsuario)
  
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setShow(false); 
      } else { // if scroll up show the navbar
        setShow(true);  
      }
  
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY); 
    };
  
    useEffect(() => {
      window.addEventListener('scroll', controlNavbar);
  
      // cleanup function
      return () => {
         window.removeEventListener('scroll', controlNavbar);
      };
    }, [lastScrollY]);

    function sairFn(){
      setUsuarioLogado(false)
      localStorage.setItem("authToken", "") 
    }


    return (
        <div style={{animationFillMode: "forwards"}} className={`w-full h-24 bg-white/30 backdrop-blur-sm flex justify-between px-8 fixed top-0 left-0 z-50 ${show? "animate-entrarMenu" : "animate-sairMenu"}`}>
            <div className="h-full aspect-square bg-white">
                
            </div>
            <div className="flex gap-4 h-full items-center">
              {
                usuarioLogado?
                <>
                  <div className="border-solid px-4 py-2 rounded-xl border-white border-2 text-white bg-transparent cursor-pointer text-center">
                    saldo: {usuario.saldo}
                  </div>
                  <Link to="/">
                    <BotaoPrincipal txt="Comprar saldo" onClickFn={() => {}}/>
                  </Link>
                  <div className="flex items-center text-center text-white">
                    Olá, {usuario.nome}
                  </div>
                  <div className="text-[10px] font-bold ml-12">
                    <BotaoSecundario txt="Sair" onClickFn={sairFn}/>
                  </div>
                </>
                :
                <>
                  <Link to="/cadastroUsuario">
                  <BotaoSecundario txt="Cadastre-se" onClickFn={() => {}}/>
                  </Link>
                  <Link to="/loginUsuario">
                    <BotaoPrincipal txt="Login" onClickFn={() => {}}/>
                  </Link>
                </>
              }
            </div>
        </div>
    )
}