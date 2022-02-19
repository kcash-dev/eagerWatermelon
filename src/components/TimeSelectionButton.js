import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import PressableWrapper from './PressableWrapper'
import { sizes, fontSizes } from '../../theme/Variables'

const TimeSelectionButton = ({ callback, item }) => {
    const handleCallback = (time) => {
        callback(time)
    }
    const [ showTimes, setShowTimes ] = useState(false)
    return (
        <PressableWrapper
            pressOut={() => handleCallback(item.time)}
        >
            <View style={[ styles.timeSelectionContainer, { backgroundColor: item.color } ]}>
                <Text style={ styles.text }>{ item.time }</Text>
            </View>
        </PressableWrapper>
    )
}

export default TimeSelectionButton

const styles = StyleSheet.create({
    timeSelectionContainer: {
        paddingVertical: '10%',
        paddingHorizontal: '30%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: sizes.sm
    },
    text: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        fontSize: fontSizes.md,
        padding: 3
    }
})