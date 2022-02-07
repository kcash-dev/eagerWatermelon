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
import ColorCircle from '../components/ColorCircle';

const windowHeight = Dimensions.get('window').height

const colorChoices = [
  {
    color: '#f94144'
  },
  {
    color: '#f8961e'
  },
  {
    color: '#f9c74f'
  },
  {
    color: '#90be6d'
  },
  {
    color: '#4d908e'
  },
  {
    color: '#277da1'
  },
  {
    color: '#000'
  }
]

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
  const [ nameInputIsFocused, setNameInputIsFocused ] = useState(false)
  const [ groupInputIsFocused, setGroupInputIsFocused ] = useState(false)
  const [ color, setColor ] = useState()
  const [ selectedColor, setSelectedColor ] = useState()


  console.log(color, "COLOR")
  const transitionConfig = {
    duration: 200
  }

  const habitInputStyles = useAnimatedStyle(() => {
    return {
        transform: [{ translateY: withTiming(habitInputHeight.value, transitionConfig) }]
    }
  })

  const showHabitInput = () => {
      habitInputHeight.value = windowHeight * .0
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
        habitName: habitName,
        habitType: buildOrQuit,
        goalType: goalType,
        goalFrequency: goalTimes,
        group: group,
        color: color
      }
    ])
    habitInputHeight.value = windowHeight
    setInputIsShowing(false)
    clearText()
    setBuildOrQuit('Build')
    setGoalType('day')
    setGoalTimes('')
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

  const setNameIsFocused = () => {
    setNameInputIsFocused(true)
  }

  const setNameNotFocused = () => {
    setNameInputIsFocused(false)
  }

  const setGroupIsFocused = () => {
    setGroupInputIsFocused(true)
  }

  const setGroupNotFocused = () => {
    setGroupInputIsFocused(false)
  }

  const getColorChoice = (color) => {
    setColor(color)
    setSelectedColor(color)
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
        <KeyboardAvoidingView style={[ styles.inputContainer, shadow, { backgroundColor: nameInputIsFocused ? colors.white : colors.invalid } ]}>
          <TextInput 
            value={ habitName }
            onChangeText={ setHabitName }
            style={[ styles.habitInput ]}
            autoCorrect
            placeholder='Enter a habit name'
            onFocus={ setNameIsFocused }
            onBlur={ setNameNotFocused }
          />
          <PressableWrapper
            pressOut={ clearText }
          >
            <MaterialCommunityIcons name="close-circle" size={ sizes.lg } color={ colors.invalid } />
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
              keyboardType='numeric'
            />
            <Text>or more times per { goalType }</Text>
          </View>
        </View>
        <KeyboardAvoidingView style={[ styles.inputContainer, shadow, { backgroundColor: groupInputIsFocused ? colors.white : colors.invalid } ]}>
          <TextInput 
            value={ group }
            onChangeText={text => setGroup(text) }
            style={[ styles.habitInput ]}
            autoCorrect
            placeholder='Enter group name'
            onFocus={ setGroupIsFocused }
            onBlur={ setGroupNotFocused }
          />
          <PressableWrapper
            pressOut={ clearText }
          >
            <MaterialCommunityIcons name="close-circle" size={ sizes.lg } color={ colors.invalid } />
          </PressableWrapper>
        </KeyboardAvoidingView>
        <View style={ styles.colorContainer }>
          <FlatList 
            data={ colorChoices }
            renderItem={({ item }) => (
              <ColorCircle item={ item.color } callback={ getColorChoice } selectedColor={ selectedColor }/>
            )}
            keyExtractor={item => item.color}
            horizontal
            scrollEnabled={ false }
          />
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
      bottom: sizes.lg,
      right: sizes.lg
    },
    inputsContainer: {
      flex: 1,
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: colors.white,
      width: '100%',
      height: '100%'
    },
    inputContainer: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: sizes.sm / 2,
      marginTop: sizes.sm,
      borderRadius: 8
    },
    habitInput: {
      width: '80%',
      padding: sizes.sm,
      fontSize: fontSizes.sm
    },
    buttons: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'absolute',
      bottom: '2%'
    },
    habitHeader: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      marginBottom: sizes.sm
    },
    selectContainer: {
      paddingHorizontal: 5,
      alignItems: 'center',
      width: '100%',
      marginTop: sizes.xl
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
      fontSize: fontSizes.sm,
      fontWeight: 'bold'
    },
    selectedBackground: {
      backgroundColor: colors.invalid,
      padding: sizes.sm / 2,
      borderRadius: 8
    },
    goalTimeInput: {
      backgroundColor: colors.invalid,
      borderRadius: 8,
      padding: sizes.sm,
      fontSize: fontSizes.sm
    },
    colorContainer: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: sizes.xl
    }
});
