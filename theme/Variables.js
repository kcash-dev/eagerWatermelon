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
    sm: 10,
    md: 15,
    lg: 20,
    xl: 30,
    xxl: 40,
    xxxl: 50
}

export const fontSizes = {
    sm: normalize(12),
    md: normalize(16),
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

