import { StyleSheet, FlatList, View, TextInput, Dimensions, Text, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Components
import AddHabitButton from '../components/AddHabitButton';
import { colors, shadow, sizes, fontSizes } from '../../theme/Variables';
import Button from '../components/Button';
import HabitContainer from '../components/HabitContainer';
import PressableWrapper from '../components/PressableWrapper';

const windowHeight = Dimensions.get('window').height

const HomeScreen = () => {
  const [ habitName, setHabitName ] = useState('')
  const [ inputIsShowing, setInputIsShowing ] = useState(false)
  const habitInputHeight = useSharedValue(windowHeight)
  const [ habitsList, setHabitsList ] = useState([])
  const [ buildOrQuit, setBuildOrQuit ] = useState('Build')
  const [ goalType, setGoalType ] = useState('day')
  const [ goalTimes, setGoalTimes ] = useState()
  const [ group, setGroup ] = useState('')
  const [ daysToTrack, setDaysToTrack ] = useState([])
  const [ inputIsFocused, setInputIsFocused ] = useState(false)


  const transitionConfig = {
    duration: 200
  }


  const habitInputStyles = useAnimatedStyle(() => {
    return {
        transform: [{ translateY: withTiming(habitInputHeight.value, transitionConfig) }]
    }
  })

  const showHabitInput = () => {
      habitInputHeight.value = windowHeight * .1
      setInputIsShowing(true)
  }

  const hideHabitInput = () => {
    habitInputHeight.value = windowHeight
    setInputIsShowing(false)
    clearText()
    setBuildOrQuit('Build')
    setGoalType('day')
    setGoalTimes('')
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

  const setSelectedToBuild = () => {
    setBuildOrQuit('Build')
  }

  const setSelectedToQuit = () => {
    setBuildOrQuit('Quit')
  }

  const setSelectedToDaily = () => {
    setGoalType('day')
  }

  const setSelectedToWeekly = () => {
    setGoalType('week')
  }

  const setSelectedToYearly = () => {
    setGoalType('year')
  }

  const setIsFocused = () => {
    setInputIsFocused(true)
  }

  const setNotFocused = () => {
    setInputIsFocused(false)
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
        {/* <Text style={ styles.habitHeader }>Enter your habit:</Text> */}
        <KeyboardAvoidingView style={[ styles.inputContainer, shadow, { backgroundColor: inputIsFocused ? colors.white : colors.invalid } ]}>
          <TextInput 
            value={ habitName }
            onChangeText={ setHabitName }
            style={[ styles.habitInput ]}
            autoCorrect
            placeholder='Enter a habit name'
            onFocus={ setIsFocused }
            onBlur={ setNotFocused }
          />
          <PressableWrapper
            pressOut={ clearText }
          >
            <MaterialCommunityIcons name="close-circle" size={ sizes.xl } color={ colors.invalid } />
          </PressableWrapper>
        </KeyboardAvoidingView>
        <View style={[ styles.selectContainer ]}>
          <Text>Are you building or quitting a habit?</Text>
          <View style={ styles.innerSelectContainer }>
            <PressableWrapper
              pressOut={ setSelectedToBuild }
            >
              <View style={ buildOrQuit === 'Build' ? styles.selectedBackground : null }>
                <Text style={ styles.selectText }>Build</Text>
              </View>
            </PressableWrapper>
            <PressableWrapper
              pressOut={ setSelectedToQuit }
            >
              <View style={ buildOrQuit === 'Quit' ? styles.selectedBackground : null }>
                <Text style={ styles.selectText }>Quit</Text>
              </View>
            </PressableWrapper>
          </View>
        </View>
        <View style={[ styles.selectContainer ]}>
          <Text>How often do you want to do this goal?</Text>
          <View style={ styles.innerSelectContainer }>
            <PressableWrapper
              pressOut={ setSelectedToDaily }
            >
              <View style={ goalType === 'day' ? styles.selectedBackground : null }>
                <Text style={ styles.selectText }>Daily</Text>
              </View>
            </PressableWrapper>
            <PressableWrapper
              pressOut={ setSelectedToWeekly }
            >
              <View style={ goalType === 'week' ? styles.selectedBackground : null }>
                <Text style={ styles.selectText }>Weekly</Text>
              </View>
            </PressableWrapper>
            <PressableWrapper
              pressOut={ setSelectedToYearly }
            >
              <View style={ goalType === 'year' ? styles.selectedBackground : null }>
                <Text style={ styles.selectText }>Yearly</Text>
              </View>
            </PressableWrapper>
          </View>
        </View>
        <View style={[ styles.selectContainer ]}>
          <Text>How often do you want to do this goal?</Text>
          <View style={ styles.innerSelectContainer }>
            <TextInput 
              placeholder='0'
              value={ goalTimes }
              onChangeText={text => setGoalTimes(text) }
              style={[ styles.goalTimeInput ]}
            />
            <Text>or more times per { goalType }</Text>
          </View>
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
      flex: 1,
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: colors.white,
      width: '100%',
      height: '90%'
    },
    inputContainer: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      marginTop: 10,
      borderRadius: 8
    },
    habitInput: {
      width: '80%',
      padding: 15,
      fontSize: fontSizes.md
    },
    buttons: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'absolute',
      bottom: '10%'
    },
    habitHeader: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      marginBottom: 15
    },
    selectContainer: {
      paddingHorizontal: 5,
      alignItems: 'center',
      width: '100%',
      marginTop: 30
    },
    innerSelectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      marginTop: 30,
      paddingHorizontal: 5,
      alignItems: 'center'
    },
    selectText: {
      fontSize: fontSizes.md,
      fontWeight: 'bold'
    },
    selectedBackground: {
      backgroundColor: colors.invalid,
      padding: 5,
      borderRadius: 8
    },
    goalTimeInput: {
      backgroundColor: colors.invalid,
      borderRadius: 8,
      padding: 15,
      fontSize: fontSizes.md
    }
});
