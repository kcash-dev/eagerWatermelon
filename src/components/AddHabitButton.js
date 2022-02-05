import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

//Components
import PressableWrapper from './PressableWrapper';

//Theme
import { colors, shadow, sizes } from '../../theme/Variables';

const AddHabitButton = ({ callback }) => {

  const handleCallback = () => {
    callback()
  }

  return (
    <PressableWrapper
      pressOut={ handleCallback }
    >
      <View style={[ styles.roundedView, shadow  ]}>
        <MaterialIcons 
          name="add" 
          size={ sizes.xxl } 
          color={ colors.primary } 
        />
      </View>
    </PressableWrapper>
  );
};

export default AddHabitButton;

const styles = StyleSheet.create({
  roundedView: {
    backgroundColor: colors.secondary,
    borderRadius: 100,
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
