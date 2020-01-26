import styled from 'styled-components'

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
