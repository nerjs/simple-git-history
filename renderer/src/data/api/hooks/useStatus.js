import { useState, useCallback } from 'react'
import { CLEAR_STATUS, UPDATE_STATUS } from '../../../../../utils/events'
import useSubscriber from '../useSubscriber'

const createDef = () => ({
    row: [],
    head: null,
    upstream: null,
    ahead: 0,
    behind: 0,
    index: {},
    work: {},
    untracked: [],
    conflicts: [],
})

export default () => {
    const [status, setStatus] = useState(createDef())

    useSubscriber({
        [CLEAR_STATUS]: () => setStatus(createDef()),
        [UPDATE_STATUS]: (_, us) => setStatus(us),
    })

    return { status }
}
