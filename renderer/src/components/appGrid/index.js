import styled from 'styled-components'

const AppGrid = styled.div`
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    display: flex;
    flex-wrap: wrap;
`

export const AppGridItem = styled.div`
    max-width: 100%;
    max-height: 100%;
    overflow: auto;

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

export default AppGrid
