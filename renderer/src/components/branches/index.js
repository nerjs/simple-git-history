import React from 'react'
import { useApi } from '../../data/api'
import BtnLoading from '../btnLoading'
import { gitBranch } from 'react-icons-kit/feather/gitBranch'
import DropDownHeader from '../ddHeader'
import BranchesBody from './body'

const Branches = () => {
    const { reposLoaded, currentBranch, listBranches } = useApi()

    if (!reposLoaded) return null

    if (!currentBranch || !listBranches || !listBranches.length)
        return <BtnLoading label="Branches..." icon={gitBranch} />

    return (
        <DropDownHeader
            icon={gitBranch}
            label="Current branch:"
            title={currentBranch}
            body={BranchesBody}
        />
    )
}

export default Branches
