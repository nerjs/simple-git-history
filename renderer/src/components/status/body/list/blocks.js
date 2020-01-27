import styled, { css } from 'styled-components'
import { getColor } from '../../../../data/theme'
import { StatusBodyItem } from '../blocks'
import { HeaderMenu, HeaderSimpleMenuItem } from '../../../headerMenu'

export const StatusListItem = styled(StatusBodyItem)``

export const BtnTabsContainer = styled.div`
    display: flex;
    width: 95%;
    margin: 3px auto 5px;
    border-radius: 5px 5px 0 0;
    background-color: ${getColor('bcActiveMenu')};
    justify-content: space-between;
`

const _TabBtn = styled.div`
    flex-grow: 1;
    width: 49%;
    text-align: center;
    padding: 4px 5px;
    cursor: pointer;
    border-radius: 5px 0 0 0;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid transparent;

    &:last-child {
        border-radius: 0 5px 0 0;
    }
`

export const TabBtn = styled(_TabBtn)`
    ${({ active }) =>
        active
            ? css`
                  color: ${getColor('secondary')};
                  cursor: default;
              `
            : css`
                  color: ${getColor('primary')};
                  background-color: ${getColor('bcHoverMenu')};

                  &:first-child {
                      border-bottom-right-radius: 5px;
                  }
                  &:last-child {
                      border-bottom-left-radius: 5px;
                  }
              `}
`

export const SimpleListMenu = styled(HeaderMenu)`
    margin-top: 10px;

    ${HeaderSimpleMenuItem} {
        padding: 8px 5px;
        cursor: default;
    }
`
