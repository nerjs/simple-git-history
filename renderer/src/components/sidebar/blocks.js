import styled from 'styled-components'
import { getSize } from '../../data/theme'
import { AppGridItem } from '../appGrid'

export const SidebarContainer = styled.div.attrs(({ sidebarWidth, headerHeight }) => ({
    style: {
        width: sidebarWidth,
    },
}))`
    position: relative;
    transition: 0.3s;
    height: calc(100% - ${getSize('headerHeight')});
    padding-left: 5px;
`

export const SidebarContentWrapper = styled(AppGridItem)``
