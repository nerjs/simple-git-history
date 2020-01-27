import styled, { css, keyframes } from 'styled-components'
import HeaderSimpleMenuItem from '../simple'

const blink = keyframes`
    from {
        opacity: 1;
        transform: rotate(0deg);
    }

    to {
        opacity: 0.4;
        transform: rotate(360deg);
    }
`

export const MenuItemContainer = styled(HeaderSimpleMenuItem)``

export const MenuItemIcon = styled.div`
    width: 30px;
    text-align: center;

    & svg {
        ${({ error }) =>
            error
                ? css`
                      color: #ffbab8;
                  `
                : ''}
        ${({ loadingItem }) =>
            loadingItem
                ? css`
                      animation: ${blink} 1s ease infinite;
                  `
                : ''}
    }
`

export const MenuItemTitle = styled.div`
    width: calc(100% - 30px);
`

export const MenuItemError = styled.div`
    width: 100%;
    margin: 2px 3px;
    margin-left: 30px;
    padding: 3px 5px;
    background-color: #ffbab899;
    color: #9e0400;
`
