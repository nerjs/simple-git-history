import React from 'react'
import BtnHeader from '../btnHeader'
import { ellipsisV } from 'react-icons-kit/fa/ellipsisV'
import { layers } from 'react-icons-kit/ikons/layers'
import { useApi } from '../../data/api'
import DropDownHeader from '../ddHeader'
import TitleStatus from './title'
import BodyStatus from './body'

const Status = () => {
    const { status } = useApi()

    if (!status.row.length)
        return <BtnHeader iconLeft={layers} iconRight={ellipsisV} label="Status" />

    return (
        <DropDownHeader
            icon={layers}
            label={!status.row || status.row.length < 2 ? 'Status' : undefined}
            title={<TitleStatus {...status} />}
            body={BodyStatus}
        />
    )
}

export default Status
