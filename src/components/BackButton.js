import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

//Components
import PressableWrapper from './PressableWrapper';

//Theme
import { sizes } from '../../theme/Variables';

const BackButton = ({ callback }) => {
    const handleCallback = () => {
        callback()
    }

    return (
        <PressableWrapper
            pressOut={ handleCallback }
        >
            <MaterialIcons name="arrow-back-ios" size={ sizes.xl } color="black" />
        </PressableWrapper>
    )
}

export default BackButton

const styles = StyleSheet.create({})