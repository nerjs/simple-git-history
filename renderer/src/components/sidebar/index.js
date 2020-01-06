import React from 'react'
import styled from 'styled-components'
import ResizeSidebar from './resize'
import { getSize } from '../../data/theme'

const SidebarContainer = styled.div.attrs(({ sidebarWidth, headerHeight }) => ({
    style: {
        width: sidebarWidth,
    },
}))`
    position: relative;
    border: 1px solid red;
    background-color: #f003;
    transition: 0.3s;
    height: calc(100% - ${getSize('headerHeight')});
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
