import React from 'react'
import { ContentContainer } from './blocks'
import GitLogs from '../gitLogs'

const Content = ({ headerHeight, sidebarWidth }) => {
    return (
        <ContentContainer headerHeight={headerHeight} sidebarWidth={sidebarWidth}>
            <GitLogs />
        </ContentContainer>
    )
}

export default Content
