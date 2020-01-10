import React from 'react'
import { useApi } from '../../data/api'
import BtnLoading from '../btnLoading'
import { display } from 'react-icons-kit/icomoon/display'
import { plus } from 'react-icons-kit/fa/plus'
import DropDownHeader from '../ddHeader'
import BodyRepos from './body'
import BtnHeader from '../btnHeader'
import { useAddRepo, AddRepoProvider } from './addRepo'
import getTitle from './getTitle'

const ReposEmpty = () => {
    const { switchAddRepo } = useAddRepo()
    return (
        <BtnHeader
            label="Add repository"
            iconLeft={display}
            iconRight={plus}
            onClick={switchAddRepo}
        />
    )
}

const ReposHasList = () => {
    const { currentRepo, listRepos } = useApi()
    const { icon, title } = getTitle(currentRepo, listRepos)

    return <DropDownHeader icon={icon} label="Current repository:" title={title} body={BodyRepos} />
}

const Repo = () => {
    const { reposLoad, reposLoaded, listRepos } = useApi()

    if (reposLoad || !reposLoaded) return <BtnLoading label="Repository..." icon={display} />

    return (
        <AddRepoProvider>
            {listRepos.length === 0 ? <ReposEmpty /> : <ReposHasList />}
        </AddRepoProvider>
    )
}

export default Repo
