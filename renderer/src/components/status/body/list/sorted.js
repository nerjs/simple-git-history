import React, { useState } from 'react'
import { HeaderMenu } from '../../../headerMenu'
import { InfoSubSection, InfoSection } from './section'

const SortedInfoView = ({ conflicts, untracked, index, work }) => {
    const [filter, setFilter] = useState('')

    return (
        <HeaderMenu onChangeFilter={setFilter}>
            <InfoSubSection filterStr={filter} statusName="conflicts" files={conflicts} />
            <InfoSection title="index" filterStr={filter} {...(index || {})} />
            <InfoSection title="work dir" filterStr={filter} {...(work || {})} />
            <InfoSubSection filterStr={filter} statusName="untracked" files={untracked} />
        </HeaderMenu>
    )
}

export default SortedInfoView
