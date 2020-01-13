import { useCallback, useEffect, useState } from 'react'
import createContextMenu from './createContextMenu'

export default ({ id, name, loading, select, contextMenu, current }) => {
    const [menu, setMenu] = useState(null)

    const handleSelect = useCallback(() => {
        if (loading) return
        select(id)
    }, [loading, id, select])

    const handleContextMenu = useCallback(() => {
        if (loading || !menu) return
        menu.popup()
    }, [loading, menu])

    useEffect(() => {
        const menu = createContextMenu({ id, name, select: handleSelect, current, contextMenu })

        setMenu(menu)
        return () => {
            if (!menu) return
            menu.destroy()
        }
    }, [])

    return { handleSelect, handleContextMenu }
}
