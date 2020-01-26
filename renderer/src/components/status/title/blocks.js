import styled, { css } from 'styled-components'
import { getColor, getStatusColor } from '../../../data/theme'
import gitStatusNames from '../../../../../utils/gitStatusNames'

export const TitleStatusContainer = styled.div``

export const HeadBadgeItem = styled.span`
    font-size: 12px;
    font-weight: normal;
    padding: 2px 4px;
    background-color: #0003;
    border-radius: 8px;

    & svg {
        color: ${getColor('secondary')};
        vertical-align: unset !important;
    }
`

export const HeadBadgeContainer = styled.div`
    display: inline-flex;
    background-color: #444d56;
    border-radius: 8px;

    &:hover ${HeadBadgeItem} {
        background-color: #0006;
    }

    ${({ countBadges }) =>
        countBadges == 2
            ? css`
                  & ${HeadBadgeItem} {
                      border-radius: 8px 2px 2px 8px;

                      &:nth-child(2) {
                          border-radius: 2px 8px 8px 2px;
                          margin-left: 3px;
                      }
                  }
              `
            : ''}
`

export const TitleFileInfoContainer = styled.span`
    display:inline-block;
    color: ${getStatusColor};
    font-weight: normal;
    margin: 0 2px;
    padding: 2px;
    border-radius: 5px;
    ${({ label }) =>
        label === gitStatusNames.conflicts || label === gitStatusNames.untracked
            ? css`
                  margin: 0 3px;
                  padding: 2px 4px;
                  box-shadow: inset 0 0 2px ${getStatusColor};
              `
            : ''}

    &:before {
        content: "${({ label }) => label}";
        font-weight: bold;
        margin-right: 2px;
    }
`
