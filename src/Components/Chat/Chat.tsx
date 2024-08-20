import { useContext, useEffect, useRef, useState } from "react"
import iconeCarta from "../../assets/images/iconeCartas.svg"
import iconeEnviar from "../../assets/images/iconeEnviar.svg"
import { ContextoLogin } from "../../Contexts/ContextoLogin/ContextoLogin"
import Login from "../Login/Login"
import { socket } from "../../socket"
import { ContextoProfissionais } from "../../Contexts/ContextoProfissionais/ContextoProfissionais"
import { ContextoAviso } from "../../Contexts/ContextoAviso/ContextoAviso"
import ModalAviso from "../ModalAviso/ModalAviso"
import ModalCarregando from "../ModalCarregando/ModalCarregando"
import { ContextoAtendimento } from "../../Contexts/ContextoAtendimento/ContextoAtendimento"
import configImg from "../../assets/images/configImg.svg"
import { ContextoUsuario } from "../../Contexts/ContextoUsuario/ContextoUsuario"
import { useNavigate } from "react-router-dom"
import ModalBaralhos from "../ModalBaralhos/ModalBaralhos"

type Props = {
    tipoChat: "atendente" | "usuario"
}

export default function Chat({tipoChat}: Props){

    type TipoInfoSala = {
        idSala: number,
        id_cliente: number,
        id_profissional: number,
        nome: string,
        tempoConsulta: number,
        precoConsulta: number,
        saldo: number,
        dataNas: string,
        finalConsulta: Date,
        minutosPassados: number
      }
      
    type tipoBaralho = {
      nomeBaralho: string,
      urlsCartas: string[]
  }

      const navigate = useNavigate()

    const {setUsuarioLogado, setAtendenteLogado, atendenteLogado, usuarioLogado} = useContext(ContextoLogin)
    const {setPerfilProAtual, perfilProAtual} = useContext(ContextoProfissionais)
    const {temAviso, setTemAviso, setTextoAviso} = useContext(ContextoAviso)
    const {infoSalas, setInfoSalas} = useContext(ContextoAtendimento)
    const {usuario, salaAtual, idMeuAtendente, setIdMeuAtendente} = useContext(ContextoUsuario)
    const [usuarioChamando, setUsuarioChamando] = useState<string>("")
    const [idUsuarioChamando, setIdUsuarioChamando] = useState<number>(0)
    const [taoChamando, setTaoChamando] = useState<boolean>(false)
    const [abrirMenu, setAbrirMenu] = useState<boolean>(false)
    const [historico, setHistorico] = useState<string[]>([""])
    const [msg, setMsg] = useState<string>("")
    const [baralhos, setBaralhos] = useState<tipoBaralho[]>([])
    const [queroBaralho, setQueroBaralho] = useState<boolean>(false)
    const [cartasSelecionadas, setCartasSelecionadas] = useState<string[]>([])


    const divScroll = useRef<HTMLDivElement>(null)
    
    function pegarInfoMeuAtendente(){

    }

    function pegarInfoMeuCliente(){
        
    }


    useEffect(() => {



        if(tipoChat == 'atendente'){

          fetch("http://localhost:8080/buscarSalasAtendente", {
            headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}
          }).then(res => res.json()).then(data => {
            console.log(data)
            if(data.codigo == 200){
              console.log("tempo consulta vindo do banco de dadso " + data.res.tempoConsulta)
              console.log(data.res)
              setInfoSalas(data.res)
              console.log("final Consulta atendenteeeeeeeeeeeeee")
              console.log(data.res.finalConsulta)
            }
          })


          fetch("http://localhost:8080/confereTokenAtendente", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json()).then(data => {
            if(data.codigo !== 200){
              setAtendenteLogado(false)
              localStorage.setItem("authToken", "")
            }else{
              setAtendenteLogado(true)
              console.log("TA ATUALIZANDO AO RECARREGARTRRRR")
              console.log(data.res)
              setPerfilProAtual(data.res)
              setBaralhos(data.arrBaralhos)
            }
            console.log(data)
          }).catch(() => {
              setTemAviso(true)
              setTextoAviso("ocorreu algum erro, por favor, tente novamente")
          })

        }else{

          fetch("http://localhost:8080/confereTokenUsuario", {
            headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}
          }).then(res => res.json()).then(data => {

            console.log("DATA DO CONFERE TOKEN DO RECARREGAR")
            console.log(data)
      
            if(data){
              if(data.codigo == 200){
                setUsuarioLogado(true)
              }else{
                setUsuarioLogado(false)
                localStorage.setItem("authToken", "") 
              }
            }else{
              setUsuarioLogado(false)
              localStorage.setItem("authToken", "") 
            }
          })


          fetch("http://localhost:8080/infoMeuAtendente", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json()).then(data => {
            console.log("CONOSLE DO ERRROO")
            console.log(data)
            if(data.codigo == 200){
              setPerfilProAtual(data.res)
              setIdMeuAtendente(data.res.id)
            }else{
              setTemAviso(true)
              setTextoAviso("ocorreu um erro ao pegar os dados do profissional. Por favor, tente recarregar a página ou fazer login novamente")
            }
          }).catch(() => {
            setTemAviso(true)
            setTextoAviso("ocorreu um erro ao pegar os dados do profissional. Por favor, tente recarregar a página ou fazer login novamente")
          })


          
        fetch("http://localhost:8080/confereTokenUsuario", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json()).then(data => {
          if(data.codigo !== 200){
            setUsuarioLogado(false)
            localStorage.setItem("authToken", "")
          }else{
            setUsuarioLogado(true)
          }
          console.log(data)
        }).catch(() => {
            setTemAviso(true)
            setTextoAviso("ocorreu algum erro, por favor, tente novamente")
        })


        }



  }, [])



  function enviarImagens(){
    let mensagemFotos = ""

    cartasSelecionadas.forEach(item => {
      mensagemFotos += "[img]" + item
    })

    socket.emit("clientMsg", {msg: mensagemFotos, room: perfilProAtual.id.toString()})

    setCartasSelecionadas([])

    setQueroBaralho(false)
  }


    function sairFn(){
        fetch("http://localhost:8080/SetarOffline", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json()).then(data => {
          console.log(data)
          if(data.codigo == 200){
            localStorage.setItem("authToken", "")
            setAtendenteLogado(false)
          }else{
            setTemAviso(true)
            setTextoAviso("Ocorreu um erro ao tentar deixar o usuário offline")
          }
        }).catch(() => {
          setTemAviso(true)
          setTextoAviso("Ocorreu um erro ao tentar deixar o usuário offline")
        })
    }


    useEffect(() => {
      console.log("INFO SALLLLLAAAAASSSS")
      console.log(infoSalas)
    }, [infoSalas])



    useEffect(() => {
          socket.on("clienteChamando", (data) => {
                console.log("o if do id atendente ta passando")
                setUsuarioChamando(data.nomeCliente)
                setIdUsuarioChamando(data.idCliente)
                setTaoChamando(true)
          })

          socket.on("respostaAtendente", () => {
                  setTaoChamando(false) 
                  //Caso tenha usuario, colcoar nome na tela
            })

          socket.on("novaSala", async (data) => {
            const {newRoom, createdById, idProfissional} = data
            console.log("novaSalaaaaaaaaaaaaaaaaaa")
            if(tipoChat == "atendente"){
              fetch("http://localhost:8080/pegarInfoCliente", {
                method: "POST",
                headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
                body: JSON.stringify({
                  idCliente: createdById.toString()
                })
              }).then(res => res.json()).then(data => {
                let objCliente = {nome: "Usuário", email: "", tempoConsulta: 0, precoConsulta: 0, saldo: 0, dataNas: "", finalConsulta: new Date(), minutosPassados: 0}
                console.log(data)
                if(data.codigo){
                  if(data.res){
                    objCliente =  data.res
                  }
                }
                  console.log("final Consulta atendenteeeeeeeeeeeeee")
                  console.log(objCliente.finalConsulta)
                  const infoSalasClone: TipoInfoSala[] = [...infoSalas]
                  infoSalasClone.push({idSala: Number(newRoom), id_cliente: Number(createdById), id_profissional: perfilProAtual.id, nome: objCliente.nome, precoConsulta: objCliente.precoConsulta, tempoConsulta: objCliente.tempoConsulta, saldo: objCliente.saldo, dataNas: objCliente.dataNas, finalConsulta: objCliente.finalConsulta, minutosPassados: objCliente.minutosPassados})
                  setInfoSalas(infoSalasClone)
              }).catch(() => {
                return {nome: "Usuário", email: ""}
              })
            }
          })

          socket.on("novaMensagem", (data) => {
            console.log(data)
            setHistorico(data.novoHistorico.split("||n||"))
          })



          /*socket.on("novaSala", async (data) => {
            console.log("chegou o nova sala")
            const {newRoom, createdById, idProfissional} = data

            console.log("idProfissionasl")
            console.log(idProfissional)
            console.log("perfilpropIDDDD")
            console.log(perfilProAtual.id)
            if(tipoChat == "atendente" && idProfissional == perfilProAtual.id){
              console.log("ta vindo aqui no novas Sala atendente")
              console.log(createdById)
              fetch("http://localhost:8080/pegarInfoCliente", {
                method: "POST",
                headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
                body: JSON.stringify({
                  idCliente: createdById.toString()
                })
              }).then(res => res.json()).then(data => {
                let objCliente = {nome: "Usuário", email: "", tempoConsulta: 0, precoConsulta: 0, saldo: 0, dataNas: "", finalConsulta: new Date(), minutosPassados: 0}
                console.log(data)
                if(data.codigo){
                  if(data.res){
                    objCliente =  data.res
                  }
                }
                  console.log("final Consulta atendenteeeeeeeeeeeeee")
                  console.log(objCliente.finalConsulta)
                  const infoSalasClone: TipoInfoSala[] = [...infoSalas]
                  infoSalasClone.push({idSala: Number(newRoom), id_cliente: Number(createdById), id_profissional: perfilProAtual.id, nome: objCliente.nome, precoConsulta: objCliente.precoConsulta, tempoConsulta: objCliente.tempoConsulta, saldo: objCliente.saldo, dataNas: objCliente.dataNas, finalConsulta: objCliente.finalConsulta, minutosPassados: objCliente.minutosPassados})
                  setInfoSalas(infoSalasClone)
              }).catch(() => {
                return {nome: "Usuário", email: ""}
              })
      
            }
            
          })*/
          if(tipoChat == "atendente"){
            fetch("http://localhost:8080/confereTokenAtendente", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json()).then(data => {
              if(data.codigo !== 200){
                setAtendenteLogado(false)
                localStorage.setItem("authToken", "")
              }else{
                setAtendenteLogado(true)
                socket.emit("adicionarNaSala", {room: perfilProAtual.id.toString()})
              }
              console.log(data)
            }).catch(() => {
                setTemAviso(true)
                setTextoAviso("ocorreu algum erro, por favor, tente novamente")
            })

            if(tipoChat == "atendente"){

            }
          }


          if(tipoChat == "atendente"){
              socket.emit("adicionarNaSala", {room: perfilProAtual.id.toString()})
          }else{
            socket.emit("adicionarNaSala", {room: idMeuAtendente.toString()})
          }


    }, [socket, perfilProAtual, infoSalas, tipoChat, taoChamando])

    useEffect(() => {
        if(tipoChat == "atendente"){
            infoSalas?.forEach(item => {
              console.log("entrei na sala: " + item.idSala.toString())
              socket.emit("adicionarNaSala", {room: item.idSala.toString()})
              console.log("atendente entrou na sala: " + item.idSala.toString())
            })
          }
    }, [infoSalas])


    useEffect(() => {
        console.log("TAO CHAMANDO")
        console.log(taoChamando)
    }, [taoChamando])


    useEffect(() => {
      if(historico.length > 0){
        if(divScroll.current?.scrollTop){
          divScroll.current.scrollTop = divScroll.current.scrollHeight
        }
      }
    }, [historico])

    useEffect(() => {
      console.log("PERFIL PRO ATUAL")
      console.log(perfilProAtual)
    }, [perfilProAtual])


    function confereConexaoFn(){
      let msg
      let room
      console.log("acionou confere coinexao")
      console.log(tipoChat)
      console.log(infoSalas)
      if(tipoChat == 'atendente'){
        msg = "eu sou o atendente de id" + perfilProAtual.id
        room = perfilProAtual.id.toString()
      }else{
        msg = "eu sou o cliente de id" + usuario.id
        room = idMeuAtendente.toString()
      }

      socket.emit("clientMsg", {msg, room})
    }

    function enviarFn(){
      socket.emit("clientMsg", {msg: tipoChat == "atendente" ? "|P|" + msg : "|U|" + msg, room: tipoChat == "atendente"? perfilProAtual.id.toString() : idMeuAtendente.toString()})
      setMsg("")
    }

    useEffect(() => {
      if(tipoChat == "atendente"){
          socket.emit("clientMsg", {msg: "", room: perfilProAtual.id.toString()})
      }else{
        socket.emit("clientMsg", {msg: "", room: idMeuAtendente.toString()})
      }
    }, [perfilProAtual, salaAtual])

    function handleKeyPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
      if (event.key === "Enter") {
        event.preventDefault()
        enviarFn()
      }
    }


    return(

        <div className="relative">
            {
                (usuarioLogado || atendenteLogado)?
                    <div className="min-h-screen bg-gradient-to-r from-azulFundoChat to-roxoFundoChat flex justify-center items-center font-poppins relative">
                        {/* Menu lateral */}
                            {
                                tipoChat == "atendente" &&
                                <div className={`fixed top-0 left-0 w-96 h-screen z-50 flex transition-all ${abrirMenu? "translate-x-[0]" : "translate-x-[-90%]"}`}>
                                    <div className="w-[90%] h-full bg-white flex flex-col px-4 py-8 gap-4 ">
                                    <div onClick={() => {}} className="px-4 py-2 bg-gray-500 rounded-md cursor-pointer">
                                        Meus históricos
                                    </div>
                                    <div onClick={() => {}} className="px-4 py-2 bg-gray-500 rounded-md cursor-pointer">
                                        Redefinir senha
                                    </div>
                                    <div onClick={sairFn} className="px-4 py-2 bg-red-600 rounded-md cursor-pointer self-start">
                                        Sair
                                    </div>
                                    </div>
                                    <div className=" mt-36 self-start flex-1 bg-white p-1 rounded-r-md cursor-pointer" onClick={() => setAbrirMenu(!abrirMenu)}>
                                    <img className=" w-full h-auto" src={configImg} alt="" />
                                    </div>
                                </div>                                
                            }
                        {/* Fim Menu lateral */}
                        <div className="h-[90vh] w-[80%] bg-fundoTextoChat rounded-xl flex flex-col overflow-hidden">
                            <div className="h-[13%] bg-white p-paddingXChat flex items-center justify-between">
                                <div className="flex gap-10 items-center">
                                    <div>
                                        <div className="text-azulTextoChat font-bold text-textoGrandeChat">{tipoChat == "atendente" ? (infoSalas.length > 0? infoSalas[0].nome : "Sala Vazia") : perfilProAtual.nome}</div>
                                        {
                                          tipoChat == "atendente" &&
                                          <div className="text-textoPequenoChat text-azulTextoChat">Nascimento: 12/03/1998</div>
                                        }
                                    </div>
                                    <div className="rounded-md bg-roxoPrincipal py-2 px-4 text-white font-bold text-textoMedioChat">
                                        10:32
                                    </div>
                                    <div className="rounded-md bg-roxoPrincipal py-2 px-4 text-white font-bold text-textoMedioChat" onClick={confereConexaoFn}>
                                        Confere Conexao
                                    </div>
                                    {
                                      tipoChat == "atendente" &&
                                      <>
                                        <div>
                                          <div className="text-azulTextoChat font-bold text-textoMedioChat">Ganhos Consulta</div>
                                          <div className="text-textoPequenoChat text-azulTextoChat">R$ 12</div>
                                        </div>
                                        <div>
                                          <div className="text-azulTextoChat font-bold text-textoMedioChat">Tempo Total Cliente</div>
                                          <div className="text-textoPequenoChat text-azulTextoChat">19 minutos</div>
                                        </div>
                                      </>
                                    }
                                </div>
                                <div>
                                    <button className="rounded-md bg-red-600 text-white px-4 py-2">
                                        Encerrar
                                    </button>
                                </div>
                            </div>
                            <div ref={divScroll} className="flex-1 p-paddingXChat  py-4 overflow-y-scroll w-full">
                              <div className="flex flex-col gap-2 justify-end">
                                {historico.map(item => {
                                  if(item.slice(0, 5) == "[img]"){
                                    let arrImg:string[] = []
                                    if(item.split("[img]").length > 0 && item.split("[img]")[0] == ""){
                                      arrImg = item.split("[img]")
                                      arrImg.shift()
                                    }
                                    return <div className={`grid grid-cols-3 w-1/2 ${tipoChat == "atendente"? "self-end" : "self-start"}`}>{arrImg.map(elem => <img src={elem} className='w-32 h-auto' />)}</div>
                                  }else{
                                    if(item.slice(0, 3) == "|U|"){
                                      return (
                                        <div className={`flex ${tipoChat == "atendente"? "self-start" : "self-end"} max-w-[80%]`}>
                                          <div className={`w-5 h-5  ${tipoChat == "atendente"? "bg-white triangle-left" : "bg-roxoPrincipal triangle-right order-2"} `}></div>
                                          <div className={`flex flex-col gap-2 ${tipoChat == "atendente"? "bg-white rounded-tr-md" : "bg-roxoPrincipal rounded-tl-md "} rounded-br-md rounded-bl-md p-2`}>
                                            <div className={`self-start p-2 text-textoPequenoChat  ${tipoChat == "atendente"? "text-roxoPrincipal" : "text-white"}`}>
                                              {tipoChat == "atendente" ? infoSalas[0].nome : "Eu"}
                                            </div>  
                                            <div className={`text-black whitespace-pre-wrap ${tipoChat == "atendente"? "text-roxoPrincipal" : "text-white"} text-wrap break-words max-w-[40vw]`}>
                                              {item.slice(3)}
                                            </div>
                                          </div>                    
                                        </div>
                                      )
                                    }else if(item.slice(0, 3) == "|P|"){
                                      return (
                                        <div className={`flex ${tipoChat == "atendente"? "self-end" : "self-start"} max-w-[80%] `}>
                                          <div className={`flex gap-2 flex-col ${tipoChat == "atendente"? "bg-roxoPrincipal rounded-tl-md" : "bg-white rounded-tr-md"} rounded-bl-md rounded-br-md p-2`}>
                                            <div className={`self-start p-2 text-textoPequenoChat ${tipoChat == "atendente"? "text-white" : "text-roxoPrincipal"} rounded-md`}>
                                              {tipoChat == "atendente" ? "Eu" : perfilProAtual.nome}
                                            </div>  
                                            <div className={`whitespace-pre-wrap ${tipoChat == "atendente"? "text-white" : "text-roxoPrincipal"} text-wrap break-words max-w-[40vw]`}>
                                              {item.slice(3)}
                                            </div>
                                          </div>
                                          <div className={`w-5 h-5 ${tipoChat == "atendente"? "bg-roxoPrincipal triangle-right" : "bg-white triangle-left -order-1"} `}></div>
                                        </div>
                                      )
                                    }

                                    return <div className='text-black'>{item}</div>
                                  }

                                })}
                              </div>
                            </div>
                            <div className="h-[10%] p-paddingXChat">
                                <div className="w-full h-[85%] flex bg-white rounded-full py-3 px-10 gap-2">
                                    {
                                      tipoChat == "atendente" &&
                                      <button className="aspect-square h-full bg-gradient-to-r from-azulFundoChat to-roxoFundoChat p-1 rounded-md">
                                        <img onClick={() => setQueroBaralho(true)} src={iconeCarta} alt="icone carta" className="h-full w-auto"/>
                                      </button>                              
                                    }
                                    <div className="flex-1 flex justify-center">
                                        <textarea value={msg} onKeyDown={e => {handleKeyPress(e)}} onChange={(e) => {setMsg(e.target.value)}} className="w-full h-full flex resize-none outline-none px-4 py-2" placeholder="Escreva sua mensagem..."/>
                                    </div>
                                    <button onClick={enviarFn} className="aspect-square h-full bg-gradient-to-r from-azulFundoChat to-roxoFundoChat p-1 rounded-md">
                                        <img src={iconeEnviar} alt="icone enviar mensagem" className="h-full w-auto"/>
                                    </button>
                                </div>
                            </div>
                        </div>  
                        {
                            tipoChat == "atendente" && taoChamando &&
                            <ModalCarregando tipoModal="atendente" idUsuario={idUsuarioChamando} nomeCliente={usuarioChamando} />
                        }      
                        {
                          queroBaralho &&
                          <ModalBaralhos setQueroCartas={setQueroBaralho} baralhos={baralhos} cartasSelecionadas={cartasSelecionadas} setCartasSelecionadas={setCartasSelecionadas} enviarFn={enviarImagens}/>
                        }                
                    </div>        
                : 
                tipoChat == "atendente"?
                <Login tipoLogin="Atendente" />
                :
                <Login tipoLogin="Usuario" />

            }
            {
                temAviso &&
                <ModalAviso/>
            }

        </div>

    )
}