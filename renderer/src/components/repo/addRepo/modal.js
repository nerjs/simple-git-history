import React, { useState, useCallback } from 'react'
import { Icon } from 'react-icons-kit'
import { remove } from 'react-icons-kit/fa/remove'
import { remote } from 'electron'
import { BtnPrimary, BtnSecondary } from '../../btn'
import {
    AddRepoContainer,
    AddRepoBlock,
    Overlay,
    Meta,
    MetaTop,
    MetaBottom,
    MetaTitle,
    Close,
    Input,
} from './blocks'

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
        <AddRepoContainer>
            <Overlay onClick={switchOpen} />
            <AddRepoBlock>
                <MetaTop>
                    <MetaTitle>Add Local Repository</MetaTitle>
                    <Close onClick={switchOpen}>
                        <Icon size={16} icon={remove} />
                    </Close>
                </MetaTop>
                <Meta>
                    <Input value={value} onChange={handleChange} />
                    <BtnSecondary onClick={handleChoose}>Choose...</BtnSecondary>
                </Meta>

                <MetaBottom>
                    <BtnSecondary onClick={switchOpen}>cancel</BtnSecondary>
                    <BtnPrimary onClick={handleAdd}>Add Repository</BtnPrimary>
                </MetaBottom>
            </AddRepoBlock>
        </AddRepoContainer>
    )
}

export default AddRepoModal
