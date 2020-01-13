import { remote } from 'electron'
import path from 'path'

const { Menu, MenuItem } = remote

export default ({ id, name, select, current, contextMenu }) => {
    const contextMenuSchema = Array.isArray(contextMenu)
        ? contextMenu
        : typeof contextMenu === 'function'
        ? contextMenu({ id, name, select, current })
        : null

    if (!contextMenuSchema) return null

    const menu = new Menu()

    contextMenuSchema.forEach(({ ...cm }) => {
        if (cm.type === 'select') {
            cm.label = cm.label || 'SELECT^'
            cm.type = 'normal'
            cm.click = select
        }

        if (cm.icon) {
            cm.icon = path.join(STATIC_DIR, 'img', 'menu', cm.icon)
        }

        menu.append(new MenuItem(cm))
    })

    return menu
}
