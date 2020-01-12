import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useApi } from '../../../data/api'
import AddBtn from './add'
import { TextInput } from '../../input'
import RepoItem from './item'

const Input = styled(TextInput)`
    width: 90%;
    margin: 3px auto;
    display: block;
`

const BodyReposContainer = styled.div``

const ReposListContainer = styled.div`
    margin: 20px 0px;
`

const filterList = (value, current) => ({ name, pathname }) => {
    if (!value || value.length === 0 || pathname === current) return true
    return pathname.search(value) >= 0 || (name ? name.search(value) >= 0 : false)
}

const BodyRepos = () => {
    const { currentRepo, listRepos, removeRepo, selectRepo, openRepo } = useApi()
    const [filterValue, setFilterValue] = useState('')
    const handleChangeFilter = useCallback(({ target }) => setFilterValue(target.value), [
        setFilterValue,
    ])

    const resultList = listRepos.filter(filterList(filterValue, currentRepo))

    return (
        <BodyReposContainer>
            <AddBtn />
            <Input onChange={handleChangeFilter} value={filterValue} placeholder="filter..." />
            <ReposListContainer>
                {resultList.map(item => (
                    <RepoItem
                        key={item.pathname}
                        {...item}
                        current={currentRepo}
                        removeRepo={removeRepo}
                        selectRepo={selectRepo}
                        openRepo={openRepo}
                    />
                ))}
            </ReposListContainer>
        </BodyReposContainer>
    )
}

export default BodyRepos
