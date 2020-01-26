import React from 'react'
import { Icon } from 'react-icons-kit'
import { longArrowDown } from 'react-icons-kit/fa/longArrowDown'
import { longArrowUp } from 'react-icons-kit/fa/longArrowUp'
import {
    StatusHeadItem,
    HeadContainer,
    HeadABContainer,
    HeadItemName,
    HeadABItem,
    HeadItemDelim,
    HeadABSpan,
} from './blocks'

const StatusBodyHead = ({ head, upstream, ahead, behind }) => {
    return (
        <StatusHeadItem>
            <HeadContainer>
                <HeadItemName title="HEAD">{head}</HeadItemName>
                {upstream && (
                    <>
                        <HeadItemDelim> -> </HeadItemDelim>
                        <HeadItemName title="UPSTREAM">{upstream}</HeadItemName>
                    </>
                )}
            </HeadContainer>
            <HeadABContainer>
                <HeadABItem title={`Ahead ${ahead} commits`}>
                    <HeadABSpan>
                        ahead
                        <Icon icon={longArrowUp} size={12} />
                    </HeadABSpan>
                    {ahead}
                </HeadABItem>
                <HeadABItem title={`Behind ${behind} commits`}>
                    <HeadABSpan>
                        behind
                        <Icon icon={longArrowDown} size={12} />
                    </HeadABSpan>
                    {behind}
                </HeadABItem>
            </HeadABContainer>
        </StatusHeadItem>
    )
}

export default StatusBodyHead
