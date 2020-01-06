import React, { useState, useCallback } from 'react'
import DataWrapper from './data'
import AppGrid from './components/appGrid'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Content from './components/content'

const App = () => {
    const [headerHeight, setHeaderHeight] = useState(40)
    const [sidebarWidth, setSidebarWidth] = useState(250)

    const sizeControl = { headerHeight, sidebarWidth, setHeaderHeight, setSidebarWidth }

    return (
        <DataWrapper>
            <AppGrid>
                <Header {...sizeControl} />
                <Content {...sizeControl} />
                <Sidebar {...sizeControl} />
            </AppGrid>
        </DataWrapper>
    )
}

export default App
