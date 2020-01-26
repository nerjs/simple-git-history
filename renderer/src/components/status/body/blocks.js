import styled, { css } from 'styled-components'
import { getColor } from '../../../data/theme'

export const StatusBodyContainer = styled.div`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    height: 100%;
    max-height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const StatusBodyItem = styled.div`
    flex-grow: 1;
    height: auto;

    &:nth-child(2) {
        height: 100%;
        overflow: auto;
    }
`
export const StatusHeadItem = styled(StatusBodyItem)`
    padding: 4px 5px;
    margin-bottom: 10px;
`

export const HeadContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    font-size: 13px;
    margin: 3px 5px;
`

export const HeadItem = styled.div`
    flex-grow: 1;
    text-align: center;
`

export const HeadItemName = styled(HeadItem)`
    color: ${getColor('primary')};
    font-size: 1em;
    font-weight: bold;
`

export const HeadItemDelim = styled(HeadItem)`
    color: ${getColor('secondary')};
    font-size: 0.95em;
    font-weight: normal;
    margin: 0 5px;
`

export const HeadABContainer = styled(HeadContainer)`
    justify-content: center;
`

export const HeadABItem = styled(HeadItemName)`
    flex-grow: unset;
    margin: 0 3px;
    font-weight: normal;
    padding: 2px 4px;
    background-color: #fff2;
`

export const HeadABSpan = styled.span`
    font-size: 0.9em;
    color: ${getColor('secondary')};
    margin-right: 4px;
    font-weight: bold;

    & svg {
        vertical-align: unset !important;
    }
`

export const BtnTabsContainer = styled.div``

export const TabBtn = styled.div``
