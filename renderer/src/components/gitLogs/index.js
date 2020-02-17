import React from 'react'
import { GitLogsContainer } from './blocks'
import { useApi } from '../../data/api'
import ScrolledLogs from './scroll'

const GitLogs = ({ sidebarWidth }) => {
    const { logs } = useApi()
    return (
        <GitLogsContainer>
            <ScrolledLogs logs={logs} sidebarWidth={sidebarWidth} />
        </GitLogsContainer>
    )
}

export default GitLogs
