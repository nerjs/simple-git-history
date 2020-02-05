import React from 'react'
import { useApi } from '../../data/api'
import { ContentContainer } from './blocks'

const Content = ({ headerHeight, sidebarWidth }) => {
    const api = useApi()
    return (
        <ContentContainer headerHeight={headerHeight} sidebarWidth={sidebarWidth}>
            <pre>{JSON.stringify(api, null, 4)}</pre>
        </ContentContainer>
    )
}

export default Content
