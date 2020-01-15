import React from 'react'
import styled from 'styled-components'
import { getSize, getColor } from '../../data/theme'
import Repo from '../repo'
import Branches from '../branches'

const HeaderContainer = styled.div`
    width: 100%;
    height: ${getSize('headerHeight')};
    background-color: ${getColor('bcHeader')};
    border-bottom: 2px solid ${getColor('borderHeader')};
`

const Header = ({ headerHeight }) => {
    return (
        <HeaderContainer headerHeight={headerHeight}>
            <Repo />
            <Branches />
        </HeaderContainer>
    )
}

export default Header
