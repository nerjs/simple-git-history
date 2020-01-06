import React from 'react'
import styled from 'styled-components'
import { Icon } from 'react-icons-kit'
import { getColor } from '../../data/theme'

const IconContainer = styled.div`
    & svg {
        width: 14px;
        height: 14px;
        color: ${getColor('primary')};

        ${({ styledIcon }) => styledIcon || ''}
    }
`

const IconHeader = ({ styledIcon, icon }) => {
    return (
        <IconContainer styledIcon={styledIcon}>
            <Icon icon={icon} />
        </IconContainer>
    )
}

export default IconHeader
