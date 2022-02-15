import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PressableWrapper from './PressableWrapper'
import { sizes } from '../../theme/Variables'

const TimeSelectionButton = ({ callback, item }) => {
    const handleCallback = (time) => {
        callback(time)
    }
  return (
    <PressableWrapper
        pressOut={() => handleCallback(item.time)}
    >
        <View style={[ styles.timeSelectionContainer, { backgroundColor: item.color } ]}>
            <Text>{ item.time }</Text>
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
    }
})