import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

//Components
import PressableWrapper from './PressableWrapper';
import { colors, shadow, sizes } from '../../theme/Variables';

const Button = ({ title, bgColor, textColor, callback }) => {
    
    const useCallback = () => {
        callback()
    }
    
  return (
    <PressableWrapper
        pressOut={ useCallback }
    >
        <View style={[ styles.button, shadow, { backgroundColor: bgColor } ]}>
            <Text style={[ styles.text, { color: textColor } ]}>{ title }</Text>
        </View>
    </PressableWrapper>
  );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        width: 100,
        aspectRatio: 2 / 1,
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: sizes.md,
        color: colors.secondary,
        fontWeight: 'bold'
    }
});
