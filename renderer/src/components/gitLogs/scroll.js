import React from 'react'
import { ScrollContainer, ScrollInnerContainer, CommitBlock, CommitInnerBlock } from './blocks'
import useGitLogPositionGrid, { BLOCK_HEIGHT, BLOCK_WIDTH } from './useGitLogPositionGrid'

const ScrolledLogs = ({ logs, sidebarWidth }) => {
    const { handleScroll, outerRef, innerRef, paddings, arr, lines } = useGitLogPositionGrid({
        logs,
        sidebarWidth,
    })

    return (
        <ScrollContainer onScroll={handleScroll} ref={outerRef}>
            <ScrollInnerContainer ref={innerRef} paddings={paddings}>
                {arr.map(({ hash, short, line }) => (
                    <CommitBlock key={hash} height={BLOCK_HEIGHT} width={BLOCK_WIDTH}>
                        <CommitInnerBlock lineOffset={lines.get(line)}>{short}</CommitInnerBlock>
                    </CommitBlock>
                ))}
            </ScrollInnerContainer>
        </ScrollContainer>
    )
}

export default ScrolledLogs
