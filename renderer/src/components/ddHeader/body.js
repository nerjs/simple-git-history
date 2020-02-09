import styled, { css } from 'styled-components'
import { getSize, getColor } from '../../data/theme'

const BodyWrapper = styled.div`
    position: absolute;
    top: ${getSize('headerHeight')};
    ${({ isRight, offsetLeft }) =>
        isRight
            ? css`
                  right: 0;
              `
            : css`
                  left: ${offsetLeft}px;
              `}
    min-width: ${({ minWidth }) => minWidth}px;
    bottom: 0;
    z-index: 200;
    background-color: ${getColor('bcActiveHeader')};
    padding: 3px 0px;
    border: 1px solid ${getColor('borderHeader')};
    border-top-color: transparent;
    border-bottom-color: transparent;
`

export default BodyWrapper
