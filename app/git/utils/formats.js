exports.branchFormat = {
    name: '%(refname:short)',
    head: '%(HEAD)',
    remote: '%(upstream:remotename)',
    parent: '%(parent)',
    tree: '%(tree)',
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
