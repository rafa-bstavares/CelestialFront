
import Banner from './Components/Banner/Banner'
import SecaoCartas from './Components/SecaoCartas/SecaoCartas'
import MenuBanner from "./Components/MenuBanner/MenuBanner"
import { useContext, useEffect, useState } from 'react'
import { ContextoAviso } from './Contexts/ContextoAviso/ContextoAviso'
import ModalAviso from './Components/ModalAviso/ModalAviso'
import SecaoProfissionais from './Components/SecaoProfissionais/SecaoProfissionais'
import { ContextoLogin } from './Contexts/ContextoLogin/ContextoLogin'
import { ContextoUsuario } from './Contexts/ContextoUsuario/ContextoUsuario'
import ModalAvisoLogin from './Components/ModalAvisoLogin/ModalAvisoLogin'
import ModalCarregando from './Components/ModalCarregando/ModalCarregando'
import ModalCertezaChamada from './Components/ModalCertezaChamada/ModalCertezaChamada'
import { socket } from './socket'
import { ContextoAtendimento } from './Contexts/ContextoAtendimento/ContextoAtendimento'
import { useNavigate } from 'react-router-dom'


function App() {
  const {temAviso, setTemAviso, setTextoAviso, temAvisoLogin, abrirModalCertezaChamada, valorMinModal} = useContext(ContextoAviso)
  const {setUsuarioLogado} = useContext(ContextoLogin)
  const {setUsuario, loading, setLoading, usuario, idMeuAtendente, setSalaAtual, setPrecoTotalConsulta, setTempoConsulta, salaAtual} = useContext(ContextoUsuario)

  const[respAtendente, setRespAtendente] = useState<string>("")
  const [tempoConsultaVar, setTempoConsultaVar] = useState<number>(5)
  const [precoConsultaVar, setPrecoConsultaVar] = useState<number>(tempoConsultaVar * valorMinModal)

  const navigate = useNavigate()


  useEffect(() => {
    //aqui só usuário tem acesso
    socket.on("respostaAtendente", (data) => {
        console.log("ta vindo aquiiiiiiii")
        console.log(data.msg)
        setRespAtendente(data.msg)
    })

    socket.on("novaSala", (data) => {
      console.log("novaSalaaaaaaaaaaaaaaaaaa")
    })
  }, [socket, respAtendente])

  useEffect(() => {
    console.log(loading)
  }, [loading])

  function criarSala(){
    fetch("http://localhost:8080/criarSala", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            idCliente: usuario.id,
            idProfissional: Number(idMeuAtendente),
            precoConsultaVar,
            tempoConsultaVar
        })
    }).then(res => res.json()).then(data => {
        if(data.codigo == 200 && data.res){
            setPrecoTotalConsulta(precoConsultaVar)
            setTempoConsulta(tempoConsultaVar)
            navigate("/Chat")
        }else{
            setTemAviso(true)
            if(data.detalhes){
                setTextoAviso(data.detalhes)
            }else{
                setTextoAviso("Ocorreu um erro não esperado no servidor")
            }
        }
    }).catch(err => {
        setTemAviso(true)
        setTextoAviso("Ocorreu um erro, por favor tente novamnete. Erro: " + err)
    })
}


  useEffect(() => {
    console.log("ta mudando a resp atendenteee")
    console.log(loading)
    console.log(respAtendente)
    if(loading && respAtendente){
      console.log("TA VINDO PRA DENTRO DO IF LOADING")
      setLoading(false)
      setRespAtendente("")
      if(respAtendente == "Aceitar"){
          console.log("ta crianddo a sala")
          criarSala()
      }else if(respAtendente == "Rejeitado"){
          setTemAviso(true)
          setTextoAviso("O profissional não pode te atendente no momento. Por favor, tente novamente mais tarde.")
          //socket.disconnect() //disconecta o socket inteiro, não só sai da sala, então dps ele não consegue entrar na sala de nvoo, TEM QUE USAR LEAVE NO SERVER SIDE
          socket.emit("sairDaSala", {room: idMeuAtendente.toString()})
          
      }
    }
  }, [respAtendente])



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

  useEffect(() => {
    setPrecoConsultaVar(usuario.saldo)
    console.log("VALOR MINUTO")
    console.log(valorMinModal)
    setTempoConsultaVar(usuario.saldo / valorMinModal)
  }, [usuario])

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
      {
        temAvisoLogin &&
        <ModalAvisoLogin/>
      }
      {
        loading &&
        <ModalCarregando tipoModal="usuario"/>
      }
      {
        abrirModalCertezaChamada &&
        <ModalCertezaChamada/>
      }
    </div>
  )
}

export default App
