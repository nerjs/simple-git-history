import React from 'react'
import { GroupMenuItemContainer, GroupMenuItemTitle, GroupMenuItemContent } from './blocks'

const HeaderGroupMenuItem = ({ level, title, children }) => {
    return (
        <GroupMenuItemContainer level={(level && level > 1 ? level : 1) - 1}>
            {title && <GroupMenuItemTitle>{title}</GroupMenuItemTitle>}
            <GroupMenuItemContent>{children}</GroupMenuItemContent>
        </GroupMenuItemContainer>
    )
}

export default HeaderGroupMenuItem
