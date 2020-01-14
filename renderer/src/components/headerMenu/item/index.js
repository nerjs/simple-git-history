import React from 'react'
import { Icon } from 'react-icons-kit'
import { MenuItemContainer, MenuItemIcon, MenuItemTitle, MenuItemError } from './blocks'
import getIcon from './getIcon'
import useControls from './useControls'

const HeaderMenuItem = ({
    id,
    name,
    loading,
    error,
    current,
    currentIcon,
    icon,
    select,
    contextMenu,
}) => {
    const itemIcon = getIcon({ loading, error, current, currentIcon, icon })

    const { handleContextMenu, handleSelect } = useControls({
        id,
        name,
        loading,
        select,
        contextMenu,
        current,
    })

    return (
        <MenuItemContainer
            error={!!error}
            active={!!current}
            onClick={handleSelect}
            onContextMenu={handleContextMenu}
        >
            <MenuItemIcon loadingItem={loading} error={error}>
                <Icon icon={itemIcon} />
            </MenuItemIcon>
            <MenuItemTitle>{name}</MenuItemTitle>
            {error && <MenuItemError>{error}</MenuItemError>}
        </MenuItemContainer>
    )
}

export default HeaderMenuItem
