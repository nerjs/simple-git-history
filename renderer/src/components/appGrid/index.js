import styled from 'styled-components'
import scrollDecorate from './scrollDecorate'

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

    ${scrollDecorate}
`

export default AppGrid
