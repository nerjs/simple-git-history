import React, { useState, useCallback } from 'react'
import { useApi } from '../../../data/api'
import { BtnTabsContainer, TabBtn, StatusBodyItem } from './blocks'

const StatusBodyListFiles = () => {
    const { status } = useApi()
    const [sorted, setSorted] = useState(false)

    const switchSorted = useCallback(() => setSorted(s => !!s), [setSorted])

    return (
        <StatusBodyItem>
            <BtnTabsContainer>
                <TabBtn active={sorted}>Sorted</TabBtn>
                <TabBtn active={!sorted}>Not sorted</TabBtn>
            </BtnTabsContainer>
        </StatusBodyItem>
    )
}

export default StatusBodyListFiles
