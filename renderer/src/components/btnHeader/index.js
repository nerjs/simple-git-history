import React from 'react'
import styled from 'styled-components'
import IconHeader from './icon'
import LabelHeader from './label'
import TitleHeader from './title'
import { getColor, getFF } from '../../data/theme'

const BtnHeaderContainer = styled.div`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 10px;
    min-width: 10vw;
    max-width: 30vw;
    border: 1px solid transparent;
    border-left-color: ${getColor('borderHeader')};
    border-right-color: ${getColor('borderHeader')};
    font-family: ${getFF('sansSerif')};
    background-color: ${({
        active,
        theme: {
            colors: { bcActiveHeader, bcHeader },
        },
    }) => (active ? bcActiveHeader : bcHeader)};
    cursor: pointer;

    &:hover {
        background-color: ${({
            active,
            theme: {
                colors: { bcActiveHeader, bcHoverHeader },
            },
        }) => (active ? bcActiveHeader : bcHoverHeader)};
    }
`

const TextWrapper = styled.div`
    margin: 0 10px;
    text-align: left;
    width: 100%;
    overflow: hidden;
`

const BtnHeader = ({ title, label, iconRight, iconLeft, cssIconLeft, cssIconRight, active }) => {
    return (
        <BtnHeaderContainer active={!!active}>
            <IconHeader styledIcon={cssIconLeft} icon={iconLeft} />
            <TextWrapper>
                <LabelHeader title={label}>{label}</LabelHeader>
                <TitleHeader title={title}>{title}</TitleHeader>
            </TextWrapper>
            <IconHeader styledIcon={cssIconRight} icon={iconRight} />
        </BtnHeaderContainer>
    )
}

export default BtnHeader
