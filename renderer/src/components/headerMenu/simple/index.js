import styled, { css } from 'styled-components'
import { getColor, getSize } from '../../../data/theme'

const HeaderSimpleMenuItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: ${getSize('textMenu')};
    margin: 3px 0px;
    padding: 8px 0;
    align-items: center;
    cursor: pointer;
    border: 1px solid transparent;
    transition: 0.1s;
    white-space: ${({ spacePre }) => (spacePre ? 'pre' : 'inherit')};

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

export default HeaderSimpleMenuItem
