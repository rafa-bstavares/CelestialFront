
import Banner from './Components/Banner/Banner'
import SecaoCartas from './Components/SecaoCartas/SecaoCartas'
import MenuBanner from "./Components/MenuBanner/MenuBanner"
import { useContext, useEffect } from 'react'
import { ContextoAviso } from './Contexts/ContextoAviso/ContextoAviso'
import ModalAviso from './Components/ModalAviso/ModalAviso'
import SecaoProfissionais from './Components/SecaoProfissionais/SecaoProfissionais'
import { ContextoLogin } from './Contexts/ContextoLogin/ContextoLogin'
import { ContextoUsuario } from './Contexts/ContextoUsuario/ContextoUsuario'
import Login from './Components/Login/Login'


function App() {
  const {temAviso, setTemAviso, setTextoAviso} = useContext(ContextoAviso)
  const {setUsuarioLogado} = useContext(ContextoLogin)
  const {setUsuario} = useContext(ContextoUsuario)


  function pegarInfoUsuario(){
    fetch("http://localhost:8080/pegarInfoUsuario", {
        headers: { "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}
    }).then(res => res.json()).then(data => {

        if(data){
          if(data.codigo == 200){
            if(data.res.id && data.res.email && data.res.nome && data.res.saldo >= 0){
              setUsuario(data.res)
            }else{
                setTemAviso(true)
                setTextoAviso("Ocorreu um erro inesperado. Por favor, tente novamente")
            }
          }else{
            if(data.detalhes){
              setTemAviso(true)
              setTextoAviso(data.detalhes)
            }else{
              setTemAviso(true)
              setTextoAviso("Ocorreu um erro inesperado. Por favor, tente novamente")
            }
          }
        }else{
          setTemAviso(true)
          setTextoAviso("Ocorreu um erro inesperado. Por favor, tente novamente")
        }
    })
}

  useEffect(() => {



    fetch("http://localhost:8080/confereTokenUsuario", {
      headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}
    }).then(res => res.json()).then(data => {

      if(data){
        if(data.codigo == 200){
          setUsuarioLogado(true)
          pegarInfoUsuario()
        }else{
          setUsuarioLogado(false)
          localStorage.setItem("authToken", "") 
        }
      }else{
        setUsuarioLogado(false)
        localStorage.setItem("authToken", "") 
      }
    })
  }, [])

  return (
    <div className='relative overflow-x-hidden'>
      <MenuBanner/>
      <Banner/>
      <SecaoCartas/>
      <SecaoProfissionais/>
      {
        temAviso &&
        <ModalAviso/>
      }
    </div>
  )
}

export default App
