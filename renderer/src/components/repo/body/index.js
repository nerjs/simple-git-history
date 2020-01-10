import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useApi } from '../../../data/api'
import AddBtn from './add'
import { TextInput } from '../../input'
import RepoItem from './item'

const Input = styled(TextInput)``

const BodyReposContainer = styled.div``

const ReposListContainer = styled.div`
    margin: 20px 5px;
`

const filterList = (value, current) => ({ name, pathname }) => {
    if (!value || value.length === 0 || pathname === current) return true
    return pathname.search(value) >= 0 || (name ? name.search(value) >= 0 : false)
}

const BodyRepos = () => {
    const { currentRepo, listRepos } = useApi()
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
                    <RepoItem key={item.pathname} {...item} current={currentRepo} />
                ))}
            </ReposListContainer>
        </BodyReposContainer>
    )
}

export default BodyRepos
