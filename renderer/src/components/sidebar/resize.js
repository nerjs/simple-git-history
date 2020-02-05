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
    user-select: none;

    &:active {
        background-color: #0000;
    }
`

const maxWidth = () => parseInt(document.body.clientWidth / 2)

const ResizeSidebar = ({ setSidebarWidth }) => {
    const [width, setWidth] = useState(250)

    const handleResize = useCallback(
        ({ clientX }) => clientX && setWidth(parseInt(document.body.clientWidth - clientX)),
        [setWidth],
    )

    useDebounce(
        () => {
            if (!width) return
            if (width < 100) return setSidebarWidth(100)
            if (width > maxWidth()) return setSidebarWidth(maxWidth())
            setSidebarWidth(width)
        },
        10,
        [width, setSidebarWidth],
    )

    return <ResizeContainer draggable onDrag={handleResize} />
}

export default ResizeSidebar
