import styled, { css, keyframes } from 'styled-components'
import { getSize, getColor } from '../../../../data/theme'

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

export const RepoItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: ${getSize('textMenu')};
    margin: 3px 0px;
    padding: 8px 0;
    align-items: center;
    cursor: pointer;
    border: 1px solid transparent;
    transition: 0.1s;

    &:hover {
        background-color: ${getColor('bcHoverMenu')};
        border-top-color: #0008;
        border-bottom-color: #0008;
    }

    &:active {
        box-shadow: inset 1px 0 2px #fff8;
        border-color: #000;
    }

    ${({ error }) =>
        error
            ? css`
                  border-color: #ff807d99;
                  padding-bottom: 2px;

                  &:hover {
                      border-color: #ff807d99;
                  }
              `
            : ''}

    ${({ active }) =>
        active
            ? css`
                  background-color: ${getColor('bcActiveMenu')};
                  border-color: #0008;

                  &:hover {
                      background-color: ${getColor('bcActiveMenu')};
                      cursor: default;
                  }
              `
            : ''}
`
export const RepoItemIcon = styled.div`
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

export const RepoItemTitle = styled.div`
    width: calc(100% - 30px);
`

export const RepoItemError = styled.div`
    width: 100%;
    margin: 2px 3px;
    margin-left: 30px;
    padding: 3px 5px;
    background-color: #ffbab899;
    color: #9e0400;
`
