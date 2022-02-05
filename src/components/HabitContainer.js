import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, sizes } from '../../theme/Variables';

//Components
import PressableWrapper from './PressableWrapper';

const HabitContainer = ({ item }) => {
    const [ checked, setChecked ] = useState(false)
    
    const checkHabit = () => {
        setChecked(true)
    }

  return (
    <PressableWrapper>
        <View style={ styles.container }>
        <Text style={ styles.text }>{ item.habitName }</Text>
        <PressableWrapper
            pressOut={ checkHabit }
        >
            { checked ?
                <View style={ styles.background }>
                    <MaterialIcons name="check-circle" size={sizes.xl} color={ colors.green } />
                </View> 
                :
                <MaterialIcons name="check-circle" size={sizes.xl} color={ colors.black } />
                }
        </PressableWrapper>
        </View>
    </PressableWrapper>
  );
};

export default HabitContainer;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.invalid
    },
    text: {
        fontSize: sizes.xl
    },
    background: {
        backgroundColor: colors.black,
        borderRadius: 100
    }
});
