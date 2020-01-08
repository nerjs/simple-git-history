import React, { useState, useCallback } from 'react'
import { useApi } from '../../data/api'
import BtnLoading from '../btnLoading'
import { display } from 'react-icons-kit/icomoon/display'
import { plus } from 'react-icons-kit/fa/plus'
import DropDownHeader from '../ddHeader'
import BodyRepos from './body'
import BtnHeader from '../btnHeader'
import AddRepo from './addRepo'
import getTitle from './getTitle'

const Repo = () => {
    const [openAddRepo, setOpenAddRepo] = useState(false)
    const switchOpenAddRepo = useCallback(() => setOpenAddRepo(o => !o), [setOpenAddRepo])
    const { reposLoad, reposLoaded, currentRepo, listRepos, addRepo } = useApi()

    if (reposLoad || !reposLoaded) return <BtnLoading label="Repository..." icon={display} />

    if (listRepos.length === 0)
        return (
            <>
                <BtnHeader
                    label="Add repository"
                    iconLeft={display}
                    iconRight={plus}
                    onClick={switchOpenAddRepo}
                />
                {openAddRepo && <AddRepo switchOpen={switchOpenAddRepo} addRepo={addRepo} />}
            </>
        )

    const { icon, title } = getTitle(currentRepo, listRepos)

    return <DropDownHeader icon={icon} label="Current repository:" title={title} body={BodyRepos} />
}

export default Repo
