import React from 'react'
import { ScrollContainer, ScrollInnerContainer, CommitBlock, CommitInnerBlock } from './blocks'
import useGitLogPositionGrid, { BLOCK_HEIGHT } from './useGitLogPositionGrid'

const ScrolledLogs = ({ logs, sidebarWidth }) => {
    const { handleScroll, outerRef, innerRef, paddings, arr, cols } = useGitLogPositionGrid({
        logs,
        sidebarWidth,
    })

    return (
        <ScrollContainer onScroll={handleScroll} ref={outerRef}>
            <ScrollInnerContainer ref={innerRef} paddings={paddings}>
                {arr.map(({ hash, short, line }) => (
                    <CommitBlock key={hash} height={BLOCK_HEIGHT}>
                        <CommitInnerBlock maxLines={cols} line={line}>
                            {short}
                        </CommitInnerBlock>
                    </CommitBlock>
                ))}
            </ScrollInnerContainer>
        </ScrollContainer>
    )
}

export default ScrolledLogs
