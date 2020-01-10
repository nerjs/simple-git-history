import React from 'react'
import styled from 'styled-components'
import { BtnPrimary, BtnSecondary } from '../../btn'
import AddBtn from './add'
import { TextInput } from '../../input'
const { remote } = require('electron')
const { Menu, MenuItem } = remote

const menu = new Menu()
menu.append(
    new MenuItem({
        label: 'MenuItem1',
        click() {
            console.log('item 1 clicked')
        },
    }),
)
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

// window.addEventListener(
//     'contextmenu',
//     e => {
//         e.preventDefault()
//         menu.popup({ window: remote.getCurrentWindow() })
//     },
//     false,
// )

const Input = styled(TextInput)``

const BodyReposContainer = styled.div``

const BodyRepos = ({ current, list }) => {
    return (
        <BodyReposContainer>
            <AddBtn />

            <Input placeholder="filter..." />
        </BodyReposContainer>
    )
}

export default BodyRepos
