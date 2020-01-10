import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Icon } from 'react-icons-kit'
import { display } from 'react-icons-kit/icomoon/display'
import { alertTriangle } from 'react-icons-kit/feather/alertTriangle'
import { loadC } from 'react-icons-kit/ionicons/loadC'
import { chevronRight } from 'react-icons-kit/ionicons/chevronRight'
import { getSize, getColor } from '../../../data/theme'

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

const RepoItemContainer = styled.div`
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
const RepoItemIcon = styled.div`
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

const RepoItemTitle = styled.div`
    width: calc(100% - 30px);
`

const RepoItemError = styled.div`
    width: 100%;
    margin: 2px 3px;
    margin-left: 30px;
    padding: 3px 5px;
    background-color: #ffbab899;
    color: #9e0400;
`

const RepoItem = ({ name, pathname, loading, error, current }) => {
    const icon = loading
        ? loadC
        : error
        ? alertTriangle
        : pathname === current
        ? chevronRight
        : display

    return (
        <RepoItemContainer error={error} active={pathname === current}>
            <RepoItemIcon loadingItem={loading} error={error}>
                <Icon icon={icon} />
            </RepoItemIcon>
            <RepoItemTitle>{name || pathname}</RepoItemTitle>
            {error && <RepoItemError>{error}</RepoItemError>}
        </RepoItemContainer>
    )
}

export default RepoItem

// const { remote } = require('electron')
// const { Menu, MenuItem } = remote

// const menu = new Menu()
// menu.append(
//     new MenuItem({
//         label: 'MenuItem1',
//         click() {
//             console.log('item 1 clicked')
//         },
//     }),
// )
// menu.append(new MenuItem({ type: 'separator' }))
// menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

// window.addEventListener(
//     'contextmenu',
//     e => {
//         e.preventDefault()
//         menu.popup({ window: remote.getCurrentWindow() })
//     },
//     false,
// )
