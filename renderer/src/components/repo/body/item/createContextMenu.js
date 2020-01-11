import { remote } from 'electron'

const { Menu, MenuItem } = remote

export default ({ selectRepo, removeRepo, pathname }) => {
    const menu = new Menu()

    menu.append(
        new MenuItem({
            label: 'select^',
            click: () => selectRepo(pathname),
        }),
    )

    menu.append(
        new MenuItem({
            label: 'remove',
            click: () => removeRepo(pathname),
        }),
    )

    return menu
}
