import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

//Components
import PressableWrapper from './PressableWrapper';

//Theme
import { sizes } from '../../theme/Variables';

const CloseButton = ({ callback }) => {
    const handleCallback = () => {
        callback();
    }
    return (
        <PressableWrapper
            pressOut={handleCallback}
        >
            <MaterialIcons name="close" size={ sizes.xl } color="black" />
        </PressableWrapper>
    )
}

export default CloseButton

const styles = StyleSheet.create({})