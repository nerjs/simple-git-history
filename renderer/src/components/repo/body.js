import React, { useState, useCallback } from 'react'
import { display } from 'react-icons-kit/icomoon/display'
import { chevronRight } from 'react-icons-kit/ionicons/chevronRight'
import { useApi } from '../../data/api'
import { useAddRepo } from './addRepo'
import { HeaderMenu, HeaderMenuItem } from '../headerMenu'

const filterList = (value, current) => ({ name, pathname }) => {
    if (!value || value.length === 0 || pathname === current) return true
    return pathname.search(value) >= 0 || (name ? name.search(value) >= 0 : false)
}

const BodyRepos = () => {
    const { currentRepo, listRepos, removeRepo, selectRepo, openRepo } = useApi()
    const { switchAddRepo } = useAddRepo()
    const [filterValue, setFilterValue] = useState('')

    const contextMenu = useCallback(
        ({ id: pathname }) => [
            { type: 'select' },
            { type: 'separator' },
            {
                label: 'Open Finder',
                click: () => openRepo({ type: 'file', pathname }),
            },
            {
                label: 'Open Editor',
                click: () => openRepo({ type: 'editor', pathname }),
            },
            {
                label: 'Open URL',
                click: () => openRepo({ type: 'url', pathname }),
                enabled: !!listRepos.find(r => r.pathname === pathname).url,
            },
            {
                label: 'Open Terminal',
                click: () => openRepo({ type: 'terminal', pathname }),
            },
            {
                type: 'separator',
            },
            {
                label: 'REMOVE',
                click: () => removeRepo(pathname),
            },
        ],
        [openRepo, removeRepo],
    )

    const resultList = listRepos.filter(filterList(filterValue, currentRepo))

    return (
        <HeaderMenu addTxt="Add repo" onAdd={switchAddRepo} onChangeFilter={setFilterValue}>
            {resultList.map(({ pathname, loading, error, name }) => (
                <HeaderMenuItem
                    key={pathname}
                    id={pathname}
                    name={name || pathname}
                    loading={loading}
                    error={error}
                    current={pathname === currentRepo}
                    currentIcon={chevronRight}
                    icon={display}
                    select={selectRepo}
                    contextMenu={contextMenu}
                />
            ))}
        </HeaderMenu>
    )
}

export default BodyRepos
