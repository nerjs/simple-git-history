import styled from 'styled-components'
import { AppGridItem } from '../appGrid'
import { getSize } from '../../data/theme'

export const ContentContainer = styled(AppGridItem).attrs(({ sidebarWidth, headerHeight }) => ({
    style: {
        width: `calc(100% - ${sidebarWidth}px)`,
    },
}))`
    height: calc(100% - ${getSize('headerHeight')});
    transition: 0.3s;
`
