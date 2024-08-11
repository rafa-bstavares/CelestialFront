
type Props = {
    txt: string,
    onClickFn: () => void
}

export default function BotaoPrincipal({txt, onClickFn}: Props){
    return (
        <div onClick={onClickFn} className="border-solid px-4 py-2 rounded-xl border-roxoPrincipal border-2 text-white bg-roxoPrincipal cursor-pointer text-center">
            {txt}
        </div>
    )
}