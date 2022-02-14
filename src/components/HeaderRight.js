import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

//Components
import PressableWrapper from './PressableWrapper'

//Theme
import { colors, sizes } from '../../theme/Variables';

const HeaderRight = () => {
  return (
    <PressableWrapper>
        <View style={ styles.background }>
            <MaterialIcons name="person" size={sizes.lg} color={ colors.black } />
        </View>
    </PressableWrapper>
  )
}

export default HeaderRight

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.invalid,
        borderRadius: sizes.md,
        padding: 2
    }
})