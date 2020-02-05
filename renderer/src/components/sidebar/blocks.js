import styled from 'styled-components'
import { getSize } from '../../data/theme'

export const SidebarContainer = styled.div.attrs(({ sidebarWidth, headerHeight }) => ({
    style: {
        width: sidebarWidth,
    },
}))`
    position: relative;
    transition: 0.3s;
    height: calc(100% - ${getSize('headerHeight')});
`

export const SidebarContentWrapper = styled.div`
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
`
