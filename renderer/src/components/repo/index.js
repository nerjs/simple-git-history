import React from 'react'
import { useApi } from '../../data/api'
import ReposLoad from './load'
import BtnLoading from '../btnLoading'

import { display } from 'react-icons-kit/icomoon/display'

const Repo = () => {
    const { reposLoad, reposLoaded } = useApi()

    if (reposLoad || !reposLoaded) return <BtnLoading label="Repository..." icon={display} />

    return null
}

export default Repo
