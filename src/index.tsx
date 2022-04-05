import './index.css'
import { items2map, Item, ItemStatus, StackMapbyType } from './stack'

interface Props {
    items: Item[]
}

const renderStackItem = (item: Item) => {
    if (item.url) {
        return (
            <a key={item.name} href={item.url} className="flex flex-wrap shadow-md transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-xl rounded bg-white max-w-xs p-4 mb-4 mr-4 space-x-2 > * + *">
                <div className="w-8 h-8"><img src={item.logo}></img></div>
                <div className="self-center">{item.name}</div>
            </a>
        )
    }

    return (
        <div key={item.name} className="flex flex-wrap rounded bg-white max-w-xs p-4 mb-4 mr-4 space-x-2 > * + *">
            <div className="w-8 h-8"><img src={item.logo}></img></div>
            <div className="self-center">{item.name}</div>
        </div>
    )
}

const renderStackItemsbyTypeAndStatus = (items: Item[], status: ItemStatus) => {
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

const renderStackRow = (items: Item[]) => {
    if (items.length == 0) {
        return (<tr></tr>)
    }
    const itemType = items[0].type
    return (
        <tr key={itemType}>
            <td className="text-white text-right -rotate-90 truncate">
                {itemType}
            </td>
            <td className="p-4 align-top max-w-md">{renderStackItemsbyTypeAndStatus(items, "use")}</td>
            <td className="p-4 align-top max-w-sm">{renderStackItemsbyTypeAndStatus(items, "investigate")}</td>
            <td className="p-4 align-top contrast-50">{renderStackItemsbyTypeAndStatus(items, "deprecated")}</td>
        </tr >
    )
}

const renderStackRows = (stackMap: StackMapbyType) => {
    const stackTypes = Object.keys(stackMap)
    return (
        <tbody>
            {
                stackTypes.map(type => {
                    return renderStackRow(stackMap[type])
                })
            }
        </tbody>
    )
}

export type { Item } from './stack'
export const Stack = ({ items }: Props) => {
    const stackMap = items2map(items)
    return (
        <div className="bg-slate-50">
            <table className="w-full table-auto rounded bg-gradient-to-r from-green-700 to-lime-100">
                <thead >
                    <tr className="text-white font-medium text-lg">
                        <td className="p-10"></td>
                        <td>Use</td>
                        <td>Investigate</td>
                        <td>Deprecated</td>
                    </tr>
                </thead>
                {renderStackRows(stackMap)}
            </table>
        </div >
    )
}
