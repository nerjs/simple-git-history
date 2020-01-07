import React from 'react'
import BtnHeader from '../btnHeader'
import { display } from 'react-icons-kit/icomoon/display'
import { ic_autorenew } from 'react-icons-kit/md/ic_autorenew'

const ReposLoad = () => {
    return (
        <BtnHeader
            label="Repository"
            title="Load..."
            iconLeft={display}
            iconRight={ic_autorenew}
            active
        />
    )
}

export default ReposLoad
