export const getSize = (name, units) => ({ theme: { sizes } }) => `${sizes[name]}${units || 'px'}`

export const getColor = name => ({ theme: { colors } }) => colors[name]

export const getFF = name => ({ theme: { fontFamily } }) => fontFamily[name]
