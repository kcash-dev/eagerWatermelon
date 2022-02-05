import { normalize } from "./ResponsiveText"

export const colors = {
    black: '#000',
    white: '#fff',
    invalid: '#ccc',
    primary: '#5941a9',
    secondary: '#f9cb40',
    green: '#BCED09'
}

export const sizes = {
    sm: 12,
    md: 18,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64
}

export const fontSizes = {
    sm: normalize(12),
    md: normalize(18),
    lg: normalize(24),
    xl: normalize(32),
    xxl: normalize(48),
    xxxl: normalize(64)
}

export const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
}

