exports.branchFormat = {
    name: '%(refname:short)',
    link: '%(objectname)',
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
    ref: '%gs',
    refNames: '%D',
    D: '%D',
    S: '%S',
    e: '%e',
    gs: '%gs',
    GS: '%GS',
    GK: '%GK',
    GF: '%GF',
    GP: '%GP',
    gD: '%gD',
    gd: '%gd',
    gn: '%gn',
    gN: '%gN',
    refBody: '%gs',
    d: '%d',
    gN: '%gD',
    // body: '%B',
    // body: '%b',
}

/*
%gD

    reflog selector, e.g., refs/stash@{1} or refs/stash@{2 minutes ago}; the format follows the rules described for the -g option. The portion before the @ is the refname as given on the command line (so git log -g refs/heads/master would yield refs/heads/master@{0}).
%gd

    shortened reflog selector; same as %gD, but the refname portion is shortened for human readability (so refs/heads/master becomes just master).
%gn

    reflog identity name
%gN 
*/

exports.logDefFormat = {
    authorDate: Number,
    committerDate: Number,
    parent: str => str.split(' ').filter(p => !!p),
    // ref: str => {
    //     try {
    //         const [, type, message] = `${str}`.match(/^\s?([a-zA-Z\s\(\)]+):\s((.)*)$/)
    //         return { type, message, str }
    //     } catch {
    //         return { type: null, message: null }
    //     }
    // },
    refNames: str => str.replace(/^\s?HEAD\s\-\>\s?/, ''),
}
