import './index.css'
import { items2map, Item, StackMapbyType } from './stack'

interface Props {
    items: Item[]
    headers?: string[]
}

const renderStackItemCard = (item: Item) => {
    let logo = (<div></div>)
    if (item.logo) {
        logo = <div className="w-8 h-8"><img src={item.logo}></img></div>
    }
    return (
        <div className="flex flex-wrap ">
            {logo}
            <div className="self-center text-neutral-800">{item.name}</div>
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

const renderStackRow = (items: Item[], headers: string[]) => {
    if (items.length == 0) {
        return (<tr></tr>)
    }
    const itemType = items[0].type
    return (
        <tr key={itemType}>
            <td className="p-4 text-white text-center" style={{ writingMode: "sideways-lr" }}>
                {itemType}
            </td>
            {headers.map(x => {
                return <td key={x} className="p-4 align-top">{renderStackItemsbyTypeAndStatus(items, x)}</td>
            })}
        </tr >
    )
}

const renderStackRows = (stackMap: StackMapbyType, headers: string[]) => {
    const stackTypes = Object.keys(stackMap)
    return (
        <tbody>
            {
                stackTypes.map(type => {
                    return renderStackRow(stackMap[type], headers)
                })
            }
        </tbody>
    )
}

export type { Item } from './stack'
export const Stack = (props: Props) => {
    const stackMap = items2map(props.items)
    let headers = ['use', 'investigate', 'deprecated']
    if (props.headers) {
        headers = props.headers
    }
    return (
        <div>
            <table className="w-full table-fixed rounded bg-gradient-to-r from-green-700 to-lime-100">
                <thead >
                    <tr className="text-white font-medium text-lg">
                        <td className="w-10"></td>
                        {headers.map(x => {
                            return <td key={x}>
                                {x.charAt(0).toUpperCase() + x.slice(1)}
                            </td>
                        })}
                    </tr>
                </thead>
                {renderStackRows(stackMap, headers)}
            </table>
        </div >
    )
}
