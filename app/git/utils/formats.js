exports.branchFormat = {
    name: '%(refname:short)',
    head: '%(HEAD)',
    remote: '%(upstream:remotename)',
    parent: '%(parent)',
    tree: '%(tree)',
}

exports.branchDefFormat = {
    remote: null,
    head: v => !!v,
}

exports.reflogFormat = {
    hash: '%H',
    selector: '%gD',
    parent: '%P',
    authorDate: '%at',
    committerDate: '%ct',
    treeHash: '%T',
    refName: '%d',
}

exports.logFormat = {
    hash: '%H',
    short: '%h',
    parent: '%P',
    authorDate: '%at',
    committerDate: '%ct',
    treeHash: '%T',
    body: '%s',
    // refBody: '%gs',
    // d: '%d'
    // gN: '%gD'
    // body: '%B',
    // body: '%b',
}

exports.logDefFormat = {
    authorDate: Number,
    committerDate: Number,
    parent: str => str.split(' '),
}
