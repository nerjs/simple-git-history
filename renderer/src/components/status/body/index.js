import React from 'react'
import { StatusBodyContainer, FilesContainer, ControlsContainer } from './blocks'
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
            <StatusBodyControls />
            {/* <FilesContainer>
                <StatusBodyListFiles />
            </FilesContainer>
            <ControlsContainer>
                {Array(3)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i}>{i}</div>
                    ))}
            </ControlsContainer> */}
        </StatusBodyContainer>
    )
}

export default BodyStatus
