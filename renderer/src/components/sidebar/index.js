import React, { useState, useEffect } from 'react'
import ResizeSidebar from './resize'
import { useApi } from '../../data/api'
import { SidebarContainer, SidebarContentWrapper } from './blocks'
import useUi from '../../data/ui'
import ActiveCommit from './activeCommit'

const Sidebar = ({ headerHeight, sidebarWidth, setSidebarWidth }) => {
    const { logs } = useApi()
    const { activeCommit, setActiveCommit } = useUi()
    const [commit, setCommit] = useState(null)

    useEffect(() => setCommit(logs.find(({ hash }) => hash === activeCommit) || null), [
        activeCommit,
        logs,
        setCommit,
    ])

    if (commit) console.log(commit)

    return (
        <SidebarContainer headerHeight={headerHeight} sidebarWidth={sidebarWidth}>
            <ResizeSidebar setSidebarWidth={setSidebarWidth} />
            <SidebarContentWrapper>
                {commit && <ActiveCommit setActiveCommit={setActiveCommit} commit={commit} />}
            </SidebarContentWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
