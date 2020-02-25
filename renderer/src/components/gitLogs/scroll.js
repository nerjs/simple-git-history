import React from 'react'
import { ScrollContainer, ScrollInnerContainer, CommitBlock, CommitInnerBlock } from './blocks'
import useGitLogPositionGrid, { BLOCK_HEIGHT, BLOCK_WIDTH } from './useGitLogPositionGrid'
import SvgGrid from './svgGrid'
import useUi from '../../data/ui'

const ScrolledLogs = ({ logs, sidebarWidth }) => {
    const {
        handleScroll,
        outerRef,
        innerRef,
        paddings,
        arr,
        lines,
        width,
        height,
    } = useGitLogPositionGrid({
        logs,
        sidebarWidth,
    })
    const { activeCommit, setActiveCommit } = useUi()

    return (
        <ScrollContainer onScroll={handleScroll} ref={outerRef}>
            <SvgGrid arr={arr} top={paddings.top} lines={lines} width={width} height={height} />
            <ScrollInnerContainer ref={innerRef} paddings={paddings}>
                {arr.map(({ hash, short, line }) => (
                    <CommitBlock key={hash} height={BLOCK_HEIGHT} width={BLOCK_WIDTH}>
                        <CommitInnerBlock
                            active={activeCommit === hash}
                            onClick={() => setActiveCommit(hash)}
                            lineOffset={lines.get(line)}
                        >
                            {short}
                        </CommitInnerBlock>
                    </CommitBlock>
                ))}
            </ScrollInnerContainer>
        </ScrollContainer>
    )
}

export default ScrolledLogs
