import './index.css'

type Props = {
    text: string
}


export const Welcome = ({ text }: Props) => {
    return (
        <div className="text-sky-800">Welcome {text}!</div>
    )
}
