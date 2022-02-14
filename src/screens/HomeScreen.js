import { StyleSheet, FlatList, View, TextInput, Dimensions, Text, Keyboard } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle
} from 'react-native-reanimated';



import { colors, shadow, sizes, fontSizes } from '../../theme/Variables';

//Components
import HabitContainer from '../components/HabitContainer';
import NewHabitInputProto from '../components/NewHabitInputProto';
import BottomNav from '../components/BottomNav';
import NewHabitInputs from '../components/NewHabitInputs';

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
  const [ color, setColor ] = useState()
  const [ selectedColor, setSelectedColor ] = useState()
  const [ textLength, setTextLength ] = useState(20)
  const [ maxTextLength, setMaxTextLength ] = useState(20)
  const [ nameInputIsFocused, setNameInputIsFocused ] = useState(false)
  const [ groupInputIsFocused, setGroupInputIsFocused ] = useState(false)

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
    setDaysToTrack([])
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
        color: color,
        daysToTrack: daysToTrack
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
    setTextLength(20)
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

  const removeOrAddDay = (day) => {
    if(daysToTrack.includes(day)) {
      const daysArray = daysToTrack.slice()
      const index = daysArray.indexOf(day)
      const newArray = daysArray.splice(index, 1)
      setDaysToTrack(daysArray)
    } else {
      setDaysToTrack([
        ...daysToTrack,
        day
      ]) 
    }
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.homeHeader }>
        <Text style={ styles.homeHeaderText }>Done</Text>
      </View>
      <FlatList 
        data={ habitsList }
        renderItem={({ item }) => <HabitContainer item={ item } />}
        keyExtractor={item => item.habitName}
        contentContainerStyle={{ marginVertical: '10%' }}
      />
      {/* <View style={ styles.addHabitButton }>
        <AddHabitButton 
          callback={ showHabitInput }
        />
      </View> */}
      <View style={ styles.nav }>
        <BottomNav addCallback={ showHabitInput }/>
      </View>
      <Animated.View style={[ styles.inputsContainer, habitInputStyles, shadow ]}>
        <NewHabitInputs 
          hideHabitInput={hideHabitInput}
          setNewHabit={setNewHabit}
          clearText={clearText}
          setSelectedToBuild={setSelectedToBuild}
          setSelectedToQuit={setSelectedToQuit}
          setSelectedToDaily={setSelectedToDaily}
          setSelectedToWeekly={setSelectedToWeekly}
          setSelectedToYearly={setSelectedToYearly}
          setNameIsFocused={setNameIsFocused}
          setNameNotFocused={setNameNotFocused}
          setGroupIsFocused={setGroupIsFocused}
          setGroupNotFocused={setGroupNotFocused}
          getColorChoice={getColorChoice}
          removeOrAddDay={removeOrAddDay}
          habitName={habitName}
          maxTextLength={maxTextLength}
          buildOrQuit={buildOrQuit}
          goalType={goalType}
          daysToTrack={daysToTrack}
          goalType={goalType}
          goalTimes={goalTimes}
          group={group}
          selectedColor={selectedColor}
          nameInputIsFocused={nameInputIsFocused}
          groupInputIsFocused={groupInputIsFocused}
          setNameInputIsFocused={setNameInputIsFocused}
          setGroupInputIsFocused={setGroupInputIsFocused}
          textLength={textLength}
          setTextLength={setTextLength}
          setHabitName={setHabitName}
          habitName={habitName}
          setGoalTimes={setGoalTimes}
          goalTimes={goalTimes}
        />
        {/* <NewHabitInputProto 
          habitName={habitName}
          setTextLength={setTextLength}
          setHabitName={setHabitName}
          setNameIsFocused={setNameIsFocused}
          setNameNotFocused={setNameNotFocused}
          maxTextLength={maxTextLength}
          nameInputIsFocused={nameInputIsFocused}
          textLength={textLength}
          clearText={clearText}
          setNewHabit={setNewHabit}
          hideHabitInput={hideHabitInput}
        /> */}
      </Animated.View>
      <Animated.View style={ styles.habitReviewContainer }>

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
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: '5%',
      marginVertical: '5%'
    },
    buttons: {
      flexDirection: 'row',
      width: '40%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    habitHeader: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      marginBottom: sizes.sm
    },
    selectContainer: {
      paddingHorizontal: sizes.sm,
      alignItems: 'center',
      width: '100%',
      marginTop: sizes.xl
    },
    innerSelectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      marginTop: 30,
      paddingHorizontal: sizes.sm,
      alignItems: 'center'
    },
    selectText: {
      fontSize: fontSizes.sm,
      fontWeight: 'bold'
    },
    selectedBackground: {
      backgroundColor: colors.invalid,
      padding: sizes.sm / 2,
      borderRadius: 8,
      margin: 3
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
    },
    scrollContainer: {
      flex: 1,
      backgroundColor: colors.white,
      width: '100%',
      height: '100%',
    },
    textHeader: {
      fontSize: fontSizes.lg
    },
    daySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    daySelectText: {
      padding: 5,
      fontSize: fontSizes.sm,
      fontWeight: 'bold'
    },
    homeHeader: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: sizes.sm
    },
    homeHeaderText: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold'
    },
    nav: {
      height: '15%'
    },
    habitReviewContainer: {
      position: 'absolute'
    }
});
