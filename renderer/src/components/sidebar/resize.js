import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import useDebounce from 'react-use/lib/useDebounce'

const ResizeContainer = styled.div`
    background-color: transparent;
    position: absolute;
    top: 0;
    left: -5px;
    bottom: 0;
    width: 5px;
    z-index: 2;
    cursor: ew-resize;
`

const ResizeSidebar = ({ setSidebarWidth }) => {
    const refResize = useRef()
    const [width, setWidth] = useState(250)

    const handleResize = useCallback(
        ({ clientX }) => {
            if (!refResize.current) return

            setWidth(document.body.clientWidth - clientX)
        },
        [setWidth, refResize],
    )

    useDebounce(
        () => {
            if (width < 100 || width > document.body.clientWidth / 2) return
            setSidebarWidth(width)
        },
        10,
        [width, setSidebarWidth],
    )

    return <ResizeContainer onDrag={handleResize} ref={refResize} />
}

export default ResizeSidebar
