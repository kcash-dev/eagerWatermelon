import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Components
import PressableWrapper from './PressableWrapper';

//Theme
import { shadow, sizes, colors } from '../../theme/Variables';

const ColorCircle = ({ item, callback, selectedColor }) => {

    const runCallback = (color) => {
        callback(color)
    }
  return (
    <PressableWrapper
        pressOut={ () => runCallback(item) }
    >
        <View 
            style={[ 
                styles.container, 
                { backgroundColor: item }, 
                shadow, 
                selectedColor === item ? { height: sizes.xl, width: sizes.xl, justifyContent: 'center', alignItems: 'center' } : null 
            ]}
        >
            { selectedColor === item ? 
                <MaterialCommunityIcons name="check-bold" size={sizes.md} color={ colors.white } />
                :
                null
            }
        </View>
    </PressableWrapper>
  );
};

export default ColorCircle;

const styles = StyleSheet.create({
    container: {
        height: sizes.lg,
        width: sizes.lg,
        borderRadius: sizes.xxxl * 2,
        marginHorizontal: sizes.sm
    }
});
