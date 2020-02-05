import React from 'react'
import ResizeSidebar from './resize'
import { useApi } from '../../data/api'
import { SidebarContainer, SidebarContentWrapper } from './blocks'

const Sidebar = ({ headerHeight, sidebarWidth, setSidebarWidth }) => {
    const api = useApi()
    return (
        <SidebarContainer headerHeight={headerHeight} sidebarWidth={sidebarWidth}>
            <ResizeSidebar setSidebarWidth={setSidebarWidth} />
            <SidebarContentWrapper>
                <pre>{JSON.stringify(api, null, 2)}</pre>
            </SidebarContentWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
