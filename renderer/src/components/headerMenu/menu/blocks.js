import React from 'react'
import styled from 'styled-components'
import { TextInput } from '../../input'
import { Icon } from 'react-icons-kit'
import { ic_add_to_queue } from 'react-icons-kit/md/ic_add_to_queue'
import { BtnSecondary } from '../../btn'

export const HeaderMenuContainer = styled.div``

export const HeaderMenuListContainer = styled.div`
    margin: 20px 0px;
`

export const HeaderMenuInput = styled(TextInput)`
    width: 90%;
    margin: 3px auto;
    display: block;
`

const AddBtnSecondary = styled(BtnSecondary)`
    display: block;
    width: 80%;
    margin: 10px auto;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        border-color: #ddd8;
    }

    & svg {
        margin-right: 10px;
    }
`

export const AddBtn = ({ onClick, label }) => (
    <AddBtnSecondary onClick={onClick}>
        <Icon icon={ic_add_to_queue} />
        {label}
    </AddBtnSecondary>
)
