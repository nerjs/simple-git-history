import React from 'react'
import { Icon } from 'react-icons-kit'
import { RepoItemContainer, RepoItemError, RepoItemIcon, RepoItemTitle } from './blocks'
import getIcon from './getIcon'

const RepoItem = ({ name, pathname, loading, error, current, selectRepo, removeRepo }) => {
    const icon = getIcon({ pathname, loading, error, current })

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
