import React, { useState } from 'react'
import { HeaderSimpleMenuItem } from '../../../headerMenu'
import { SimpleListMenu } from './blocks'

const SimpleInfoView = ({ row }) => {
    const [filter, setFilter] = useState('')

    return (
        <SimpleListMenu onChangeFilter={setFilter}>
            {row
                .filter(str => !filter || str.search(filter) >= 0)
                .map(str => (
                    <HeaderSimpleMenuItem key={str} spacePre>
                        {str}
                    </HeaderSimpleMenuItem>
                ))}
        </SimpleListMenu>
    )
}

export default SimpleInfoView
