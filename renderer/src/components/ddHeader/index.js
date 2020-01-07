import React from 'react'
import OverlayDD from './overlay'
import BtnHeader from '../btnHeader'
import { ic_keyboard_arrow_down } from 'react-icons-kit/md/ic_keyboard_arrow_down'
import { ic_keyboard_arrow_up } from 'react-icons-kit/md/ic_keyboard_arrow_up'
import useDDHeader from './useDDheader'
import BodyWrapper from './body'

const DropDownHeader = ({ title, label, icon, body: BodyComponent }) => {
    const { active, swithActive, refContainer, refButton, minWidth, offsetLeft } = useDDHeader()

    return (
        <>
            <BtnHeader
                ref={refButton}
                title={title}
                label={label}
                iconLeft={icon}
                iconRight={active ? ic_keyboard_arrow_up : ic_keyboard_arrow_down}
                onClick={swithActive}
                active={active}
            />
            {active && (
                <>
                    <OverlayDD />
                    <BodyWrapper ref={refContainer} minWidth={minWidth} offsetLeft={offsetLeft}>
                        <BodyComponent />
                    </BodyWrapper>
                </>
            )}
        </>
    )
}

export default DropDownHeader
