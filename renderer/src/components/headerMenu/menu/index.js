import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { HeaderMenuContainer, HeaderMenuListContainer, AddBtn, HeaderMenuInput } from './blocks'

const HeaderMenu = ({ children, addTxt, onAdd, onChangeFilter }) => {
    const handleChangeFilter = useCallback(({ target: { value } }) => onChangeFilter(value), [
        onChangeFilter,
    ])

    return (
        <HeaderMenuContainer>
            {addTxt && onAdd && <AddBtn onClick={onAdd} label={addTxt || Add} />}
            {onChangeFilter && (
                <HeaderMenuInput onChange={handleChangeFilter} placeholder="filter..." />
            )}
            <HeaderMenuListContainer>{children}</HeaderMenuListContainer>
        </HeaderMenuContainer>
    )
}

HeaderMenu.propTypes = {
    addTxt: propTypes.string,
    onAdd: propTypes.func,
    onChangeFilter: propTypes.func,
}

export default HeaderMenu
