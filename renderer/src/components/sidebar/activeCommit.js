import React from 'react'
import { ACSection, ACLabel, ACSpan } from './blocks'

const ActiveCommit = ({
    setActiveCommit,
    commit: { hash, short, body, parents, children, refNames, treeHash, S, d, branch },
}) => {
    return (
        <>
            <ACSection>
                <ACLabel>{short}</ACLabel>
                <ACSpan>{hash}</ACSpan>
            </ACSection>
            <ACSection>
                <ACLabel>body</ACLabel>
                <ACSpan>{body}</ACSpan>
            </ACSection>
            <ACSection>
                <ACLabel>parents</ACLabel>
                {parents.map(p => (
                    <ACSpan key={p.hash}>{p.short}</ACSpan>
                ))}
            </ACSection>
            <ACSection>
                <ACLabel>children</ACLabel>
                {children.map(p => (
                    <ACSpan key={p.hash}>{p.short}</ACSpan>
                ))}
            </ACSection>
            <ACSection>
                <ACLabel>branch</ACLabel>
                <ACSpan>{branch}</ACSpan>
            </ACSection>
            <ACSection>
                <ACLabel>refNames</ACLabel>
                <ACSpan>{refNames}</ACSpan>
            </ACSection>
            <ACSection>
                <ACLabel>S</ACLabel>
                <ACSpan>{S}</ACSpan>
            </ACSection>
            <ACSection>
                <ACLabel>d</ACLabel>
                <ACSpan>{d}</ACSpan>
            </ACSection>
            <ACSection>
                <ACLabel>treeHash</ACLabel>
                <ACSpan>{treeHash}</ACSpan>
            </ACSection>
            <ACSection>
                <ACLabel>parents treeHash</ACLabel>
                {parents.map(p => (
                    <ACSpan key={`${p.treeHash}_${p.short}`}>{p.treeHash}</ACSpan>
                ))}
            </ACSection>
            <ACSection>
                <ACLabel>childrens treeHash</ACLabel>
                {children.map(p => (
                    <ACSpan key={`${p.treeHash}_${p.short}`}>{p.treeHash}</ACSpan>
                ))}
            </ACSection>
        </>
    )
}

export default ActiveCommit
