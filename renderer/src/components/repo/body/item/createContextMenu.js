import { remote } from 'electron'

const { Menu, MenuItem } = remote

export default ({ selectRepo, removeRepo, openRepo, pathname, url }) => {
    const menu = new Menu()

    menu.append(
        new MenuItem({
            label: 'SELECT^',
            click: () => selectRepo(pathname),
        }),
    )

    menu.append(
        new MenuItem({
            type: 'separator',
        }),
    )

    menu.append(
        new MenuItem({
            label: 'Open Finder',
            click: () => openRepo({ type: 'file', pathname }),
        }),
    )

    menu.append(
        new MenuItem({
            label: 'Open Editor',
            click: () => openRepo({ type: 'editor', pathname }),
        }),
    )

    menu.append(
        new MenuItem({
            label: 'Open URL',
            click: () => openRepo({ type: 'url', pathname }),
            enabled: !!url,
        }),
    )

    menu.append(
        new MenuItem({
            label: 'Open Terminal',
            click: () => openRepo({ type: 'terminal', pathname }),
        }),
    )

    menu.append(
        new MenuItem({
            type: 'separator',
        }),
    )

    menu.append(
        new MenuItem({
            label: 'REMOVE',
            click: () => removeRepo(pathname),
        }),
    )

    return menu
}
