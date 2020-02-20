const createPC = list => item => {
    if (!item.children) item.children = []
    item.parents = item.parent
        .map(hash => {
            const idx = list.findIndex(p => p.hash === hash)
            return list[idx]
        })
        .filter(p => !!p)

    item.parents.forEach(parent => {
        if (!parent.children) parent.children = []
        parent.children.push(item)
    })
}

const createDfs = () => {
    let i = 0

    const dfs = item => {
        if (item.explored) return
        item.explored = true
        item.children.forEach(dfs)
        item.i = i
        i++
    }

    return dfs
}

const createBranchData = () => item => {
    item.branchChildren = item.children.filter(c => c.parents[0] === item)
    item.mergeChildren = item.children.filter(c => c.parents[0] !== item)
}

const createCurved = () => {
    const branches = []

    const curved = item => {
        if (item.branchChildren.length) {
            const idx = branches.findIndex(b => b === item.branchChildren[0])
            if (idx >= 0) {
                branches[idx] = item
            }
        } else {
            branches.push(item)
        }

        item.branchChildren.forEach(bc => {
            const idx2 = branches.findIndex(b => b === bc)
            branches[idx2] = null
        })
        item.j = branches.findIndex(b => b === item)
    }

    return curved
}

const prepareList = list => {
    list.sort((a, b) => b.committerDate - a.committerDate)

    list.forEach(createPC(list))

    list.forEach(createDfs())

    list.sort((a, b) => a.i - b.i)

    list.forEach(createBranchData())

    list.forEach(createCurved())

    list.forEach(item => {
        item.line = item.j
        item.index = item.i
        delete item.branchChildren
        delete item.mergeChildren
        delete item.i
        delete item.j
    })

    return list
}

export default prepareList
