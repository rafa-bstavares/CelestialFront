
type Props = {
    txt: string,
    onClickFn: () => void
}

export default function BotaoSecundario({txt, onClickFn}: Props){
    return (
        <div onClick={onClickFn} className="border-solid px-4 py-2 rounded-xl border-white border-2 text-white bg-transparent cursor-pointer text-center">
            {txt}
        </div>
    )
}