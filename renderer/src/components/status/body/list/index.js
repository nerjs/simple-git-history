import React, { useState, useCallback } from 'react'
import { BtnTabsContainer, TabBtn, StatusBodyItem, StatusListItem } from './blocks'
import SortedInfoView from './sorted'
import SimpleInfoView from './simple'

const StatusBodyListFiles = ({ row, ...props }) => {
    const [sorted, setSorted] = useState(true)

    const checkSorted = useCallback(() => setSorted(true), [setSorted])
    const checkUnsorted = useCallback(() => setSorted(false), [setSorted])

    return (
        <StatusListItem>
            <BtnTabsContainer>
                <TabBtn active={sorted} onClick={checkSorted}>
                    Sorted
                </TabBtn>
                <TabBtn active={!sorted} onClick={checkUnsorted}>
                    Not sorted
                </TabBtn>
            </BtnTabsContainer>
            {sorted ? <SortedInfoView {...props} /> : <SimpleInfoView row={row} />}
        </StatusListItem>
    )
}

export default StatusBodyListFiles
