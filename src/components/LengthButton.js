import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//Components
import PressableWrapper from './PressableWrapper'

//Theme
import { colors, fontSizes, shadow } from '../../theme/Variables'

const LengthButton = ({ item, callback }) => {
    const handleCallback = (length) => {
        callback(length)
    }
  return (
    <PressableWrapper
        pressOut={() => handleCallback(item.name)}
    >
        <View style={ styles.container }>
            <View style={[styles.overlay, { backgroundColor: item.color }, shadow ]} />
            <Text style={ styles.titleText }>{ item.name }</Text>
        </View>
    </PressableWrapper>
  )
}

export default LengthButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 8,
        padding: 5,
        margin: 5
    },
    imageBackground: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 8,
    },
    titleText: {
        color: colors.white,
        fontSize: fontSizes.md,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})