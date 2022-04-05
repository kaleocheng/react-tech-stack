export type ItemStatus = 'use' | 'investigate' | 'deprecated'

export interface Item {
    name: string
    logo?: string
    status: ItemStatus
    type: string
    url?: string
}

export interface StackMapbyType {
    [type: string]: Item[]
}

export function items2map(items: Item[]): StackMapbyType {
    const stackMap: StackMapbyType = {}
    for (const item of items) {
        if (item.type in stackMap) {
            stackMap[item.type].push(item)
        } else {
            stackMap[item.type] = [item]
        }
    }
    return stackMap
}
