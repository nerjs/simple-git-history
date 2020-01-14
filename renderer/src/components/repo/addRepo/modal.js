import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { remote } from 'electron'
import { BtnSecondary } from '../../btn'
import HeaderModal from '../../headerModal'
import { TextInput } from '../../input'

export const Input = styled(TextInput)`
    width: 100%;
    margin-right: 10px;
`

const AddRepoModal = ({ addRepo, switchOpen, currentRepo }) => {
    const [value, setValue] = useState(currentRepo || '')

    const handleChange = useCallback(({ target: { value } }) => setValue(value), [setValue])

    const handleChoose = useCallback(async () => {
        const { canceled, filePaths } = await remote.dialog.showOpenDialog(
            remote.getCurrentWindow(),
            {
                properties: ['openDirectory'],
            },
        )

        if (canceled || !filePaths || filePaths.length === 0) return

        setValue(filePaths[0])
    }, [setValue])

    const handleAdd = useCallback(() => {
        if (!value) return
        addRepo(value)
        switchOpen()
    }, [addRepo, switchOpen, value])

    return (
        <HeaderModal
            onClose={switchOpen}
            title="Add Local Repository"
            confirmTxt="Add Repository"
            onConfirm={handleAdd}
        >
            <Input value={value} onChange={handleChange} />
            <BtnSecondary onClick={handleChoose}>Choose...</BtnSecondary>
        </HeaderModal>
    )
}

export default AddRepoModal
