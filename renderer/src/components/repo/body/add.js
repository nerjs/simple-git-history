import React from 'react'
import styled from 'styled-components'
import { Icon } from 'react-icons-kit'
import { ic_add_to_queue } from 'react-icons-kit/md/ic_add_to_queue'
import { BtnSecondary } from '../../btn'
import { useAddRepo } from '../addRepo'

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

const AddBtn = () => {
    const { switchAddRepo } = useAddRepo()

    return (
        <AddBtnSecondary onClick={switchAddRepo}>
            <Icon icon={ic_add_to_queue} />
            Add
        </AddBtnSecondary>
    )
}

export default AddBtn
