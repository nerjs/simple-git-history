import React, { useState, useCallback } from 'react'
import { BtnTabsContainer, TabBtn, StatusBodyItem } from './blocks'

const StatusBodyListFiles = () => {
    const [sorted, setSorted] = useState(false)

    const checkSorted = useCallback(() => setSorted(true), [setSorted])
    const checkUnsorted = useCallback(() => setSorted(false), [setSorted])

    return (
        <StatusBodyItem>
            <BtnTabsContainer>
                <TabBtn active={sorted} onClick={checkSorted}>
                    Sorted
                </TabBtn>
                <TabBtn active={!sorted} onClick={checkUnsorted}>
                    Not sorted
                </TabBtn>
            </BtnTabsContainer>
        </StatusBodyItem>
    )
}

export default StatusBodyListFiles
