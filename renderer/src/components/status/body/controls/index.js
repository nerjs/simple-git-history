import React, { useRef, useState, useEffect } from 'react'
import { StatusControlsItem, EmptyBlock, ControlsBtn } from './blocks'
import CBtn from './btn'
import { useApi } from '../../../../data/api'

const StatusBodyControls = () => {
    const contRef = useRef()
    const [wrap, setWrap] = useState(false)
    const {
        status: { upstream, ahead, behind },
        statusLoaders,
        fetch,
        pull,
        push,
    } = useApi()

    useEffect(() => {
        if (!contRef.current) return
        const isWrap = contRef.current.getBoundingClientRect().width > 350
        if (isWrap === wrap) return
        setWrap(isWrap)
    }, [contRef, wrap, setWrap])

    if (!upstream) return <EmptyBlock>Upstream is empty</EmptyBlock>
    return (
        <StatusControlsItem ref={contRef} wrapBtns={wrap}>
            <CBtn loading={statusLoaders.fetch} onClick={fetch}>
                Fetch
            </CBtn>
            <CBtn disabled={!behind} loading={statusLoaders.pull} onClick={pull}>
                Pull
            </CBtn>
            <CBtn disabled={!ahead} loading={statusLoaders.push} onClick={push}>
                Push
            </CBtn>
        </StatusControlsItem>
    )
}

export default StatusBodyControls
