import React from 'react'
import gitStatusNames from '../../../../../../utils/gitStatusNames'
import { HeaderGroupMenuItem, HeaderMenuItem } from '../../../headerMenu'
import { StyledGroupMenu } from './blocks'
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2'
import { shuffle } from 'react-icons-kit/icomoon/shuffle'
import { power } from 'react-icons-kit/icomoon/power'
import { cross } from 'react-icons-kit/icomoon/cross'
import { embed } from 'react-icons-kit/icomoon/embed'
import { plus } from 'react-icons-kit/fa/plus'
import { question } from 'react-icons-kit/fa/question'

const icons = {
    modified: embed,
    added: plus,
    deleted: cross,
    renamed: arrowRight2,
    // copied: 'C',
    unmerged: power,
    conflicts: shuffle,
    untracked: question,
}

const parseFiles = files =>
    files.map(file => (typeof file === 'string' ? file : `${file.from} -> ${file.to}`))

const filterFiles = (files, filterStr) => {
    if (!files || !Array.isArray(files) || !files.length) return []
    if (!filterStr) return parseFiles(files)
    return parseFiles(files).filter(file => file.search(filterStr) >= 0)
}

export const InfoSubSection = ({ statusName, files, filterStr, level }) => {
    if (!files || !Array.isArray(files) || !files.length) return null
    const arrFiles = filterFiles(files, filterStr)

    if (!arrFiles.length) return null

    return (
        <StyledGroupMenu label={gitStatusNames[statusName]} title={statusName} level={level || 1}>
            {arrFiles.map(file => (
                <HeaderMenuItem key={file} name={file} icon={icons[statusName]} />
            ))}
        </StyledGroupMenu>
    )
}

export const InfoSection = ({ title, filterStr, ...props }) => {
    const infos = Object.keys(props)
        .map(key => {
            if (!Array.isArray(props[key]) || !props[key].length) return null
            const arr = filterFiles(props[key], filterStr)
            if (!arr.length) return null
            return { key, arr }
        })
        .filter(f => !!f)

    if (!infos.length) return null

    return (
        <HeaderGroupMenuItem title={`${title}`.toUpperCase()} level={1}>
            {infos.map(({ key, arr }) => (
                <InfoSubSection key={key} statusName={key} files={arr} level={2} />
            ))}
        </HeaderGroupMenuItem>
    )
}
