import React from 'react'
import styled from 'styled-components'
import { getSize } from '../../data/theme'

const HeaderContainer = styled.div`
    width: 100%;
    height: ${getSize('headerHeight')};
    border: 1px solid green;
    background-color: #0f03;
`

const Header = ({ headerHeight }) => {
    return <HeaderContainer headerHeight={headerHeight}>header</HeaderContainer>
}

export default Header
