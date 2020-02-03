import React, { useRef, useState, useEffect } from 'react'
import { StatusControlsItem, EmptyBlock, ControlsBtn } from './blocks'
import CBtn from './btn'

const StatusBodyControls = ({ head, upstream, ahead, behind }) => {
    const contRef = useRef()
    const [wrap, setWrap] = useState(false)

    useEffect(() => {
        if (!contRef.current) return
        const isWrap = contRef.current.getBoundingClientRect().width > 350
        if (isWrap === wrap) return
        setWrap(isWrap)
    }, [contRef, wrap, setWrap])

    if (!upstream) return <EmptyBlock>Upstream is empty</EmptyBlock>
    return (
        <StatusControlsItem ref={contRef} wrapBtns={wrap}>
            <CBtn>Fetch</CBtn>
            <CBtn>Pull</CBtn>
            <CBtn>Push</CBtn>
        </StatusControlsItem>
    )
}

export default StatusBodyControls
