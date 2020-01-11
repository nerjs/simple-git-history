import { useCallback } from 'react'

export default ({ selectRepo, removeRepo, pathname, loading }) => {
    const handleClick = useCallback(() => {
        if (loading) return
        selectRepo(pathname)
    }, [selectRepo, pathname, loading])

    const handleContextMenu = useCallback(() => {
        if (loading) return
        console.log('context menu')
    }, [loading])

    return { handleClick, handleContextMenu }
}
