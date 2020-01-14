import React from 'react'
import { Icon } from 'react-icons-kit'
import { remove } from 'react-icons-kit/fa/remove'
import { BtnPrimary, BtnSecondary } from '../btn'
import {
    HeaderModalContainer,
    HeaderModalBlock,
    Overlay,
    Meta,
    MetaTop,
    MetaBottom,
    MetaTitle,
    Close,
} from './blocks'

const HeaderModal = ({ onClose, title, children, cancelTxt, onConfirm, confirmTxt }) => {
    return (
        <HeaderModalContainer>
            <Overlay onClick={onClose} />
            <HeaderModalBlock>
                <MetaTop>
                    <MetaTitle>{title}</MetaTitle>
                    <Close onClick={onClose}>
                        <Icon size={16} icon={remove} />
                    </Close>
                </MetaTop>

                <Meta>{children}</Meta>

                <MetaBottom>
                    <BtnSecondary onClick={onClose}>{cancelTxt || 'Cancel'}</BtnSecondary>
                    <BtnPrimary onClick={onConfirm}>{confirmTxt || 'Confirm'}</BtnPrimary>
                </MetaBottom>
            </HeaderModalBlock>
        </HeaderModalContainer>
    )
}

export default HeaderModal
