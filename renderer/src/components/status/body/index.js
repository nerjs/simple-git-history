import React from 'react'
import { StatusBodyContainer } from './blocks'
import StatusBodyListFiles from './list'
import StatusBodyHead from './head'
import { useApi } from '../../../data/api'
import StatusBodyControls from './controls'

const BodyStatus = ({}) => {
    const {
        status: { head, upstream, ahead, behind, ...status },
    } = useApi()

    return (
        <StatusBodyContainer>
            <StatusBodyHead head={head} upstream={upstream} ahead={ahead} behind={behind} />
            <StatusBodyListFiles {...status} />
            <StatusBodyControls head={head} upstream={upstream} ahead={ahead} behind={behind} />
        </StatusBodyContainer>
    )
}

export default BodyStatus
