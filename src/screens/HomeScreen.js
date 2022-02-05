import { StyleSheet, FlatList, View, TextInput, Dimensions, Text } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Components
import AddHabitButton from '../components/AddHabitButton';
import { colors, shadow, sizes } from '../../theme/Variables';
import Button from '../components/Button';
import HabitContainer from '../components/HabitContainer';
import PressableWrapper from '../components/PressableWrapper';

const windowHeight = Dimensions.get('window').height

const HomeScreen = () => {
  const [ habitName, setHabitName ] = useState('')
  const [ inputIsShowing, setInputIsShowing ] = useState(false)
  const habitInputHeight = useSharedValue(windowHeight)
  const [ habitsList, setHabitsList ] = useState([])

  const transitionConfig = {
    duration: 200
  }


  const habitInputStyles = useAnimatedStyle(() => {
    return {
        transform: [{ translateY: withTiming(habitInputHeight.value, transitionConfig) }]
    }
  })

  const showHabitInput = () => {
      habitInputHeight.value = windowHeight * .37
      setInputIsShowing(true)
  }

  const hideHabitInput = () => {
    habitInputHeight.value = windowHeight
    setInputIsShowing(false)
    clearText()
  }

  const setNewHabit = () => {
    setHabitsList([
      ...habitsList,
      {
        habitName: habitName
      }
    ])
    habitInputHeight.value = windowHeight
    setInputIsShowing(false)
    clearText()
  }

  const clearText = () => {
    setHabitName('')
  }

  return (
    <View style={ styles.container }>
      <FlatList 
        data={ habitsList }
        renderItem={({ item }) => <HabitContainer item={ item } />}
        keyExtractor={item => item.habitName}
      />
      <View style={ styles.addHabitButton }>
        <AddHabitButton 
          callback={ showHabitInput }
        />
      </View>
      <Animated.View style={[ styles.inputsContainer, habitInputStyles, shadow]}>
        <Text style={ styles.habitHeader }>Enter your habit:</Text>
        <View style={[ styles.inputContainer, shadow ]}>
          <TextInput 
            value={ habitName }
            onChangeText={ setHabitName }
            style={[ styles.habitInput ]}
          />
          <PressableWrapper
            pressOut={ clearText }
          >
            <MaterialCommunityIcons name="close-circle" size={ sizes.xl } color={ colors.invalid } />
          </PressableWrapper>
        </View>
        <View style={ styles.buttons }>
          <Button 
            title="Submit"
            bgColor={ colors.primary }
            textColor={ colors.secondary }
            callback={ setNewHabit }
          />
          <Button 
            title="Cancel"
            bgColor={ colors.invalid }
            textColor={ colors.black }
            style={ styles.button }
            callback={ hideHabitInput }
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white
    },
    addHabitButton: {
      position: 'absolute',
      bottom: 20,
      right: 20
    },
    inputsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: colors.white,
      width: '100%',
      height: '55%'
    },
    inputContainer: {
      backgroundColor: colors.white,
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5
    },
    habitInput: {
      width: '80%',
      padding: 15,
      fontSize: sizes.lg
    },
    buttons: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'absolute',
      bottom: 30
    },
    habitHeader: {
      fontSize: sizes.xl,
      fontWeight: 'bold',
      marginBottom: 15
    }
});
