import React from 'react'
import styled, { css } from 'styled-components'
import { display } from 'react-icons-kit/icomoon/display'
import { getSize, getColor } from '../../data/theme'
import DropDownHeader from '../ddHeader'
import Repo from '../repo'
import BtnHeader from '../btnHeader'

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
            <DropDownHeader title="title" label="label" icon={display} body={Repo} />
            <BtnHeader
                title="titledwecfweafcarearfcrfrfva czsrf adawefwe xefweafadaewwedcarvarfareganakjrfbzrhfjzkcbhjzbjfdzsvbcszjd"
                label="label dfcef aefdwsefca"
                iconLeft={display}
                iconRight={display}
            />
        </HeaderContainer>
    )
}

export default Header
