import React from 'react'
import { GroupMenuItemContainer, GroupMenuItemTitle, GroupMenuItemContent } from './blocks'

const HeaderGroupMenuItem = ({ level, title, children, className }) => {
    return (
        <GroupMenuItemContainer level={(level && level > 1 ? level : 1) - 1} className={className}>
            {title && <GroupMenuItemTitle>{title}</GroupMenuItemTitle>}
            <GroupMenuItemContent>{children}</GroupMenuItemContent>
        </GroupMenuItemContainer>
    )
}

export default HeaderGroupMenuItem
