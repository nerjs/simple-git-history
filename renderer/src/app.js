import React, { useState, useCallback } from 'react'
import DataWrapper from './data'
import AppGrid from './components/appGrid'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Content from './components/content'
import { UiProvider } from './data/ui'

const App = () => {
    const [sidebarWidth, setSidebarWidth] = useState(400)

    const sizeControl = { sidebarWidth, setSidebarWidth }

    return (
        <DataWrapper>
            <UiProvider>
                <AppGrid>
                    <Header {...sizeControl} />
                    <Content {...sizeControl} />
                    <Sidebar {...sizeControl} />
                </AppGrid>
            </UiProvider>
        </DataWrapper>
    )
}

export default App
