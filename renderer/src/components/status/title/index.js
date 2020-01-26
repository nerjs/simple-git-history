import React from 'react'
import { Icon } from 'react-icons-kit'
import { longArrowDown } from 'react-icons-kit/fa/longArrowDown'
import { longArrowUp } from 'react-icons-kit/fa/longArrowUp'
import gitStatusNames from '../../../../../utils/gitStatusNames'
import {
    TitleStatusContainer,
    HeadBadgeItem,
    HeadBadgeContainer,
    TitleFileInfoContainer,
} from './blocks'

const HeadBadge = ({ ahead, behind }) => {
    if (!ahead && !behind) return null
    const countBadges = !!ahead + !!behind
    return (
        <HeadBadgeContainer countBadges={countBadges}>
            {!!ahead && (
                <HeadBadgeItem title={`ahead ${ahead} commits`}>
                    <Icon icon={longArrowUp} size={10} />
                    {ahead}
                </HeadBadgeItem>
            )}
            {!!behind && (
                <HeadBadgeItem title={`behind ${behind} commits`}>
                    <Icon icon={longArrowDown} size={10} />
                    {behind}
                </HeadBadgeItem>
            )}
        </HeadBadgeContainer>
    )
}

const info = ({ conflicts, untracked, index = {}, work = {} }) => {
    const res = []

    Object.keys(index).forEach(key => {
        if (index[key] && index[key].length) {
            res.push({ label: gitStatusNames[key], count: index[key].length })
        }

        if (work[key] && work[key].length) {
            let count = work[key].length
            const indexFileIdx = res.findIndex(({ label }) => label === gitStatusNames[key])

            if (indexFileIdx < 0) {
                res.push({ label: gitStatusNames[key], count })
            } else {
                res[indexFileIdx].count += count
            }
        }
    })

    if (untracked && untracked.length) res.push({ label: '?', count: untracked.length })

    if (conflicts && conflicts.length) res.push({ label: '!', count: conflicts.length })
    return res
}

const TitleStatus = ({ ahead, behind, ...props }) => (
    <TitleStatusContainer>
        <HeadBadge ahead={ahead} behind={behind} />{' '}
        {info(props).map(({ label, count }) => (
            <TitleFileInfoContainer
                key={label}
                label={label}
                title={`${gitStatusNames[label]} ${count} files`}
            >
                {count}
            </TitleFileInfoContainer>
        ))}
    </TitleStatusContainer>
)

export default TitleStatus
