import { css } from 'styled-components'

export default css`
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #fff2;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #8889;
        border-radius: 5px;
        min-height: 20vh;
    }

    &:hover {
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background: #aaa;
            box-shadow: inset 0 0 5px #000;
        }
    }
`
