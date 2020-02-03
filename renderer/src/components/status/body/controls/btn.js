import React from 'react'
import { Icon } from 'react-icons-kit'
import { spinner9 } from 'react-icons-kit/icomoon/spinner9'
import { ControlsBtn } from './blocks'

const CBtn = ({ loading, disabled, onClick, children }) => {
    const btnDisabled = disabled || loading

    return (
        <ControlsBtn disabled={btnDisabled} onClick={onClick}>
            {children}
            {loading && <Icon icon={spinner9} size={10} />}
        </ControlsBtn>
    )
}

export default CBtn
