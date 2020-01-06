import React from 'react'
import styled from 'styled-components'
import ResizeSidebar from './resize'

const SidebarContainer = styled.div.attrs(({ sidebarWidth, headerHeight }) => ({
    style: {
        width: sidebarWidth,
        height: `calc(100% - ${headerHeight}px)`,
    },
}))`
    position: relative;
    border: 1px solid red;
    background-color: #f003;
    transition: 0.3s;
`

const Sidebar = ({ headerHeight, sidebarWidth, setSidebarWidth }) => {
    return (
        <SidebarContainer headerHeight={headerHeight} sidebarWidth={sidebarWidth}>
            <ResizeSidebar setSidebarWidth={setSidebarWidth} />
            sidebar
        </SidebarContainer>
    )
}

export default Sidebar
