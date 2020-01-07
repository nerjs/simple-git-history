import React from 'react'
import { css, keyframes } from 'styled-components'
import BtnHeader from '../btnHeader'
import { ic_autorenew } from 'react-icons-kit/md/ic_autorenew'

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

const iconAnimate = css`
    animation: ${spin} 2s linear infinite;
`

const BtnLoading = ({ icon, ...props }) => {
    return (
        <BtnHeader
            {...props}
            iconLeft={icon}
            iconRight={ic_autorenew}
            cssIconRight={iconAnimate}
            active
        />
    )
}

export default BtnLoading
