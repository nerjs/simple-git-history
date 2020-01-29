import styled, { css } from 'styled-components'
import HeaderSimpleMenuItem from '../simple'
import { getColor } from '../../../data/theme'

export const GroupMenuItemTitle = styled(HeaderSimpleMenuItem)`
    background-color: ${getColor('bcHoverMenu')};
    border-top-color: #0006;
    border-bottom-color: #0006;
    cursor: default;
    color: ${getColor('secondary')};
    margin: 0;

    &:hover {
        border-top-color: #0006;
        border-bottom-color: #0006;
    }

    &:active {
        box-shadow: none;
    }
`

export const GroupMenuItemContent = styled.div``

export const GroupMenuItemContainer = styled.div`
    margin: 5px 0 10px;

    & & {
        margin-top: 2px;
    }

    ${({ level }) => css`
        ${HeaderSimpleMenuItem} {
            padding-left: ${(level + 1) * 15 + 5}px;
            padding-right: 5px;
        }

        ${GroupMenuItemTitle} {
            padding-left: ${level * 15 + 5}px;
        }
    `}
`
