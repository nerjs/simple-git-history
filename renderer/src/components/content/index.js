import React from 'react'
import styled from 'styled-components'
import { getSize } from '../../data/theme'

const ContentContainer = styled.div.attrs(({ sidebarWidth, headerHeight }) => ({
    style: {
        width: `calc(100% - ${sidebarWidth}px)`,
    },
}))`
    border: 1px solid blue;
    background-color: #00f3;
    height: calc(100% - ${getSize('headerHeight')});
    transition: 0.3s;
`

const Content = ({ headerHeight, sidebarWidth }) => {
    return (
        <ContentContainer headerHeight={headerHeight} sidebarWidth={sidebarWidth}>
            content
        </ContentContainer>
    )
}

export default Content
