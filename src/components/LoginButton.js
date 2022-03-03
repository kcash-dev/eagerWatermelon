import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

//Components
import PressableWrapper from './PressableWrapper';
import { colors, fontSizes, sizes } from '../../theme/Variables';

const Button = ({ title, bgColor, textColor, callback }) => {
    
    const useCallback = () => {
        callback()
    }
    
  return (
    <PressableWrapper
        pressOut={ useCallback }
    >
        <View style={[ styles.button, { backgroundColor: bgColor } ]}>
            <Text style={[ styles.text, { color: textColor } ]}>{ title }</Text>
        </View>
    </PressableWrapper>
  );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        width: '90%',
        padding: sizes.md,
        backgroundColor: colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    text: {
        fontSize: fontSizes.sm,
        color: colors.secondary,
        fontWeight: 'bold'
    }
});
