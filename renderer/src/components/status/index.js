import React from 'react'
import BtnHeader from '../btnHeader'
import { Icon } from 'react-icons-kit'
import { gitCompare } from 'react-icons-kit/oct/gitCompare'
import { ic_memory } from 'react-icons-kit/md/ic_memory'
import { ic_exposure } from 'react-icons-kit/md/ic_exposure'
import { ellipsisV } from 'react-icons-kit/fa/ellipsisV'
import { badge } from 'react-icons-kit/iconic/badge'
import { dial } from 'react-icons-kit/iconic/dial'
import { project } from 'react-icons-kit/iconic/project'
import { layers } from 'react-icons-kit/ikons/layers'
import { useApi } from '../../data/api'
import DropDownHeader from '../ddHeader'
import TitleStatus from './title'
import BodyStatus from './body'

const Status = () => {
    const {
        status: { row, ...status },
    } = useApi()

    if (!row.length) return <BtnHeader iconLeft={layers} iconRight={ellipsisV} label="Status" />

    return <DropDownHeader icon={layers} label="Status" title={<TitleStatus />} body={BodyStatus} />
}

export default Status
