import { useCallback, useEffect, useState } from 'react'
import createContextMenu from './createContextMenu'

export default ({ selectRepo, removeRepo, openRepo, pathname, loading, url }) => {
    const [menu, setMenu] = useState(null)

    const handleClick = useCallback(() => {
        if (loading) return
        selectRepo(pathname)
    }, [selectRepo, pathname, loading])

    const handleContextMenu = useCallback(() => {
        if (loading || !menu) return
        menu.popup()
    }, [loading, menu])

    useEffect(() => {
        const menu = createContextMenu({ selectRepo, removeRepo, openRepo, pathname, url })

        setMenu(menu)
        return () => menu.destroy()
    }, [])

    return { handleClick, handleContextMenu }
}
