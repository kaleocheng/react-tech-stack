import './index.css'
import { items2map, Item, StackMapbyType } from './stack'


interface Props {
    items: Item[]
    headers?: string[]
    bgColorFrom?: string
    bgColorTo?: string
    headerColor?: string,
    typeColor?: string,
}


const renderStackItemCard = (item: Item) => {
    let logo = (<div></div>)
    if (item.logo) {
        logo = <div className="w-8 h-8"><img src={item.logo}></img></div>
    }
    return (
        <div className="md:flex md:flex-wrap grid place-items-center">
            {logo}
            <div className="text-neutral-800 px-1">{item.name}</div>
        </div>
    )
}

const renderStackItem = (item: Item) => {
    if (item.url) {
        return (
            <a key={item.name} href={item.url} className="shadow-md \
                    transition ease-in-out duration-300 \
                    hover:-translate-y-1 hover:shadow-xl \
                    rounded bg-white max-w-xs p-4 mb-4 mr-4 space-x-2 > * + *">
                {renderStackItemCard(item)}
            </a>
        )
    }

    return (
        <div key={item.name} className="rounded bg-white max-w-xs p-4 mb-4 mr-4 space-x-2 > * + *">
            {renderStackItemCard(item)}
        </div>
    )
}

const renderStackItemsbyTypeAndStatus = (items: Item[], status: string) => {
    let key = `${items[0].type}-${items[0].status}`
    return (
        <div key={key} className="flex flex-wrap">
            {
                items.filter(x => x.status == status).map(item => {
                    return renderStackItem(item)
                })
            }
        </div>
    )
}

const renderStackRow = (items: Item[], headers: string[], typeColor: string) => {
    if (items.length == 0) {
        return (<tr></tr>)
    }
    const itemType = items[0].type
    return (
        <tr key={itemType}>
            <td className="p-4 text-center" style={{ writingMode: "sideways-lr", color: typeColor }}>
                {itemType}
            </td>
            {headers.map(x => {
                return <td key={x} className="p-4 align-top">{renderStackItemsbyTypeAndStatus(items, x)}</td>
            })}
        </tr >
    )
}

const renderStackRows = (stackMap: StackMapbyType, headers: string[]) => {

}

export type { Item } from './stack'
export const Stack = ({
    items,
    headers = ['use', 'investigate', 'deprecated'],
    bgColorFrom = '#15803D',
    bgColorTo = '#ECFCCB',
    headerColor = '#FFFFFF',
    typeColor = '#FFFFFF'
}: Props) => {
    const stackMap = items2map(items)
    const stackTypes = Object.keys(stackMap)

    return (
        <div>
            <table className="rounded bg-gradient-to-r"
                style={{ backgroundImage: `linear-gradient(to right, ${bgColorFrom}, ${bgColorTo})` }}
            >
                <thead >
                    <tr className="font-medium text-lg" style={{ color: headerColor }}>
                        <td className="w-10 pt-4"></td>
                        {headers.map(x => {
                            return <td key={x} className="pt-4">
                                {x.charAt(0).toUpperCase() + x.slice(1)}
                            </td>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        stackTypes.map(type => {
                            return renderStackRow(stackMap[type], headers, typeColor)
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}
