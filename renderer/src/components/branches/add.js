import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import HeaderModal from '../headerModal'
import { TextInput } from '../input'

export const Input = styled(TextInput)`
    width: 100%;
    margin-right: 10px;
    padding: 4px 10px;
`

const BranchesAddModal = ({ onClose, onConfirm }) => {
    const [value, setValue] = useState('')

    const handleChange = useCallback(({ target }) => setValue(target.value), [setValue])

    const handleConfirm = useCallback(() => {
        onConfirm(value)
        onClose()
    }, [value, onClose, onConfirm])

    return (
        <HeaderModal
            onClose={onClose}
            title="Add new branch"
            confirmTxt="Add"
            onConfirm={handleConfirm}
        >
            <Input value={value} onChange={handleChange} placeholder="Add branch" />
        </HeaderModal>
    )
}

export default BranchesAddModal
