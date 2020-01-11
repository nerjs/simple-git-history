import React from 'react'
import { Icon } from 'react-icons-kit'
import { RepoItemContainer, RepoItemError, RepoItemIcon, RepoItemTitle } from './blocks'
import getIcon from './getIcon'
import useControls from './useControls'

const RepoItem = ({ name, pathname, loading, error, current, selectRepo, removeRepo }) => {
    const icon = getIcon({ pathname, loading, error, current })
    const { handleContextMenu, handleClick } = useControls({
        selectRepo,
        removeRepo,
        pathname,
        loading,
    })

    return (
        <RepoItemContainer
            error={error}
            active={pathname === current}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
        >
            <RepoItemIcon loadingItem={loading} error={error}>
                <Icon icon={icon} />
            </RepoItemIcon>
            <RepoItemTitle>{name || pathname}</RepoItemTitle>
            {error && <RepoItemError>{error}</RepoItemError>}
        </RepoItemContainer>
    )
}

export default RepoItem
