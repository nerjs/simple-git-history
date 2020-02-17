import React from 'react'
import { GitLogsContainer } from './blocks'
import { useApi } from '../../data/api'
import ScrolledLogs from './scroll'

const GitLogs = () => {
    const { logs } = useApi()
    return (
        <GitLogsContainer>
            <ScrolledLogs logs={logs} />
        </GitLogsContainer>
    )
}

export default GitLogs
