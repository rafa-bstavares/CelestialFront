import { useContext, useEffect, useRef, useState } from "react"
import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal"
import { ContextoAviso } from "../../Contexts/ContextoAviso/ContextoAviso"



export default function CadastrosAdm(){
    type objTrabalho = {
        trabalho: string
    }
    
    const {setTemAviso, setTextoAviso} = useContext(ContextoAviso)


    const [nomeProf, setNomeProf] = useState<string>("")
    const [emailProf, setEmailProf] = useState<string>("")
    const [descricaoMenor, setDescricaoMenor] = useState<string>("")
    const [descricaoMaior, setDescricaoMaior] = useState<string>("")
    const [imgProf, setImgProf] = useState<File>()
    const [valorMin, setValorMin] = useState<number>(1)
    const [percentualPro, setPercentualPro] = useState<number>(30)
    const [novoTrabalho, setNovoTrabalho] = useState<string>("")
    const [novoTrabalho2, setNovoTrabalho2] = useState<string>("")
    const [numeroFotos, setNumeroFotos] = useState<number>(1)
    const [arrNumFotos, setArrNumFotos] = useState<string[]>([])
    const [fotos, setFotos] = useState<File[] | []>([])
    const [arrTrabalhosTotais, setArrTrabalhosTotais] = useState<objTrabalho[]>([])
    const [idxUltimaClicada, setIdxUltimaClicada] = useState<number>() 

    const ref = useRef<HTMLInputElement>(null)

    const ordinalidade = ['primeira', 'segunda', 'terceira', 'quarta', 'quinta', 'sexta', 'sétima', 'oitava', 'nona', 'décima', 'décima primeira', 'décima segunda', 'décima terceira', 'décima quarta', 'décima quinta']

    function cadastrarFn(){

        if(nomeProf && emailProf && valorMin > 0 && percentualPro >= 1 && percentualPro <= 100){
            let formData = new FormData()
            if(imgProf){
                formData.append("imgProf", imgProf)
            }else{
                //foto padrão de perfil
            }

            formData.append("nomeProf", nomeProf)
            formData.append("emailProf", emailProf)
            formData.append("descricaoMenor", descricaoMenor)
            formData.append("descricaoMaior", descricaoMaior)
            formData.append("valorMin", valorMin.toString())
            formData.append("percentualPro", percentualPro.toString())
            /*fetch("http://localhost:8080/addFotoProfissional", {
                method: "POST",
                headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
                body: formData
            }).then(res => res.json()).then(data => {
                if(data){
                    if(data.codigo == 200 && data.res.length > 0){
                        fetch("http://localhost:8080/addInfosProfissional", {
                            method: "POST",
                            headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
                            body: JSON.stringify({
                                nomeProf,
                                emailProf,
                                descricaoMenor,
                                descricaoMaior,
                                valorMin,
                                percentualPro,
                                id: data.res[0].id
                            })
                        }).then(res => res.json()).then(data => {
                            if(data.codigo !== 200){
                                setTemAviso(true)
                                setTextoAviso("Ocorreu um erro ao cadastrar o profissional. Por favor, tente novamente.")
                            }
                        })
                    }else{
                        //criar modal aviso e dar o aviso de erro
                    }
                }
            })*/

            fetch("http://localhost:8080/cadastrarProfissional", {
                method: "POST",
                headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
                body: formData
            }).then(res => res.json()).then(data => {
                console.log(data)
                if(data.codigo !== 200){
                    setTemAviso(true)
                    setTextoAviso("Ocorreu um erro ao cadastrar o profissional. Por favor, tente novamente.")
                }else{

                }
            })

        }


    }

    function inputFn(file: File){
        if(idxUltimaClicada !== undefined){
            console.log(fotos)
            let newFotos = [...fotos]
            newFotos[idxUltimaClicada] = file
            setFotos(newFotos)
        }
    }

    useEffect(() => {
        let newArr = []
        let initialFotos = new Array(numeroFotos)
        for(let i = 0; i < numeroFotos; i++){
            newArr.push("item")
        }
        setArrNumFotos(newArr)
        setFotos(initialFotos)
    }, [numeroFotos])

    function cadastrarTrabFn(){
        if(novoTrabalho == novoTrabalho2 && novoTrabalho){
            const formData = new FormData()
            for(let i = 0; i < fotos.length; i++){
                formData.append("files", fotos[i])
            }
            formData.append("novoTrabalho", novoTrabalho)

            fetch("http://localhost:8080/cadastrarTrabalho", {
                method: "POST",
                headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
                body: formData
            }).then(res => res.json()).then(data => {

            })
        }
    }

    return(
        <div className="flex gap-10 p-paddingSecaoGeral  text-white">
            <div className="w-1/2 flex flex-col gap-4">
                <div>Cadastro Profissional</div>
                <input className="px-4 py-2  lg:w-1/2 text-black rounded-md bg-white/80" type="text" placeholder="nome do profissional" value={nomeProf} onChange={e => setNomeProf(e.target.value)}/>
                <input className="px-4 py-2  lg:w-1/2 text-black rounded-md bg-white/80" type="text" placeholder="email do profissional" value={emailProf} onChange={e => setEmailProf(e.target.value)}/>
                <div>
                    <div>Descrição menor (máx 200 caracteres): </div>
                    <textarea onChange={e => setDescricaoMenor(e.target.value)} className="h-32 p-2 lg:w-4/5 w-full text-black outline-none rounded-md bg-white/80 resize-none" maxLength={200} id=""></textarea>
                </div>
                <div>
                    <div>Descrição maior (máx 2000 caracteres): </div>
                    <textarea onChange={e => setDescricaoMaior(e.target.value)} className="h-32 lg:w-4/5 w-full p-2 text-black outline-none rounded-md bg-white/80 resize-none" maxLength={2000} id=""></textarea>
                </div>
                <input type="file" onChange={(e) => {if(e.target.files){setImgProf(e.target.files[0])}}}  className=""/> {/* e.target.files[0].name */}
                <div>
                    <div>Valor em reais do minuto do profissional:</div>
                    <input type="number" min={1} onChange={e => setValorMin(Number(e.target.value))} className="text-black lg:w-1/4 p-2 rounded-md bg-white/80"/>
                </div>
                <div>
                    <div>Percentual do profissional. Ex: Caso queira que seja 30% colocar abaixo apenas o número 30.</div>
                    <input type="number" min={1} onChange={e => setPercentualPro(Number(e.target.value))} className="text-black lg:w-1/4 p-2 rounded-md bg-white/80"/>
                </div>
                <div className="self-start">
                    <BotaoPrincipal txt="Cadastrar" onClickFn={cadastrarFn}/>
                </div>
            </div>
            <div className="w-1/2">
                <div className="text-white text-2xl">Cadastrar Novo Baralho</div>
                <input className="px-4 py-2  text-black" type="text" placeholder="Digite o novo trabalho" value={novoTrabalho} onChange={e => setNovoTrabalho(e.target.value)}/>
                <input className="px-4 py-2  text-black" type="text" placeholder="Repita o novo trabalho" value={novoTrabalho2} onChange={e => setNovoTrabalho2(e.target.value)}/>
                <div className="flex flex-col">
                    <label htmlFor="selectNumFotos" className="text-lg">Numero de cartas</label>
                    <select onChange={(e) => {setNumeroFotos(Number(e.target.value))}} name="selectNumFotos" id="selectNumFotos" className="border-2 border-solid border-black text-black">
                        {ordinalidade.map((item, index) => <option value={index + 1} key={item}>{index + 1}</option>)}
                    </select>
                </div>
                <div className="flex flex-col relative">
                    <div className="grid grid-cols-3 gap-2">
                        {arrNumFotos.map((item, index) =>  <div key={item} className={`cursor-pointer p-1 rounded-md bg-${fotos[index] ? "bg-green-500" : "white"} text-${fotos[index] ? "white" : "black"} text-sm flex justify-center items-center`} onClick={() => {setIdxUltimaClicada(index); ref.current?.click()}}>
                        {fotos[index] ? "foto selecionada" : ordinalidade[index] + " foto"}</div>)}
                    </div>
                    <input type="file" ref={ref} onChange={(e) => {if(e.target.files){inputFn(e.target.files[0])}}}  className="opacity-0 absolute inset-0 -z-10"/> {/* e.target.files[0].name */}
                </div>
                <button className="self-start px-4 py-2 rounded-md bg-white text-black" onClick={cadastrarTrabFn}>Cadastrar Novo Baralho</button>
                <div className="mt-10">Baralhos Cadastrados:</div>
                <div>
                    {arrTrabalhosTotais.map(item => <div>{item.trabalho}</div>)}
                </div>
            </div>
        </div>
    )
}