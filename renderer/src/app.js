import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StylesContainer = styled.div`
    color: blue;
`

const App = () => {
    const [Test, setTest] = useState()

    useEffect(() => {
        import('./as').then(r => setTest(() => r.default))
    }, [setTest])

    return (
        <StylesContainer>
            test 2<hr />
            {Test && <Test z="qwerty" />}
        </StylesContainer>
    )
}

export default App
