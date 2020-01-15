import React, { useState, useCallback } from 'react'
import { useApi } from '../../data/api'
import { gitBranch } from 'react-icons-kit/feather/gitBranch'
import { branch } from 'react-icons-kit/entypo/branch'
import { HeaderMenuItem, HeaderMenu } from '../headerMenu'
import BranchesAddModal from './add'

const BranchesBody = () => {
    const {
        listBranches,
        currentBranch,
        addBranch,
        checkoutBranch,
        removeBaranch,
        currentRepo,
        openRepo,
    } = useApi()
    const [showAddModal, setShowAddModal] = useState(false)

    const switchSowModal = useCallback(() => setShowAddModal(s => !s), [setShowAddModal])

    const contextMenu = useCallback(
        ({ id: name }) => [
            { type: 'select', label: 'checkout^' },
            { type: 'separator' },
            {
                label: 'Open in terminal',
                click: () => openRepo({ type: 'terminal', pathname: currentRepo }),
            },
            { type: 'separator' },
            { label: 'remove', click: () => removeBaranch(name) },
        ],
        [removeBaranch],
    )

    return (
        <HeaderMenu addTxt="Add branch" onAdd={switchSowModal}>
            {listBranches.map(({ name }) => (
                <HeaderMenuItem
                    key={name}
                    id={name}
                    name={name}
                    icon={branch}
                    currentIcon={gitBranch}
                    current={name === currentBranch}
                    select={checkoutBranch}
                    contextMenu={contextMenu}
                />
            ))}
            {showAddModal && <BranchesAddModal onClose={switchSowModal} onConfirm={addBranch} />}
        </HeaderMenu>
    )
}

export default BranchesBody
