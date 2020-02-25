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

export const ACSection = styled.div`
    margin: 10px 3px;
    padding: 2px 2px 10px;
    border-bottom: 1px solid #fff1;
    max-width: 100%;
`

export const ACLabel = styled.div`
    margin: 5px 2px 10px;
    padding: 2px;
    font-size: 12px;
    font-weight: bold;
`

export const ACSpan = styled.span`
    display: inline-block;
    margin: 3px 10px;
    padding: 3px 10px;
    box-shadow: 0 0 5px #fff9;
`
