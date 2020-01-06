import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
    width: 100%;
    height: ${({ headerHeight }) => headerHeight}px;
    border: 1px solid green;
    background-color: #0f03;
`

const Header = ({ headerHeight }) => {
    return <HeaderContainer headerHeight={headerHeight}>header</HeaderContainer>
}

export default Header
