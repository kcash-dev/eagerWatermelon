import { StyleSheet, FlatList, View, Dimensions, Text } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle
} from 'react-native-reanimated';

import { colors, shadow, sizes, fontSizes } from '../../theme/Variables';

//Components
import HabitContainer from '../components/HabitContainer';
import NewHabitInput from '../components/NewHabitInput';
import BottomNav from '../components/BottomNav';

const windowHeight = Dimensions.get('window').height


const HomeScreen = () => {
  
  const [ inputIsShowing, setInputIsShowing ] = useState(false)
  const habitInputHeight = useSharedValue(windowHeight)
  const [ habitsList, setHabitsList ] = useState([])
  const [ textLength, setTextLength ] = useState(20)
  const [ maxTextLength, setMaxTextLength ] = useState(20)
  const [ nameInputIsFocused, setNameInputIsFocused ] = useState(false)
  
  //Habit Info
  const [ habitName, setHabitName ] = useState('')
  const [ habitChain, setHabitChain ] = useState([])
  const [ habitTime, setHabitTime ] = useState()
  const [ habitTimeOfDay, setHabitTimeOfDay ] = useState()
  const [ habitLength, setHabitLength ] = useState()

  //Animations
  const transitionConfig = {
    duration: 200
  }

  const habitInputStyles = useAnimatedStyle(() => {
    return {
        transform: [{ translateY: withTiming(habitInputHeight.value, transitionConfig) }]
    }
  })

  //Functions
  const showHabitInput = () => {
      habitInputHeight.value = windowHeight * .0
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
        habitName: habitName,
        habitChain: habitChain,
        habitTime: habitTime,
        habitTimeOfDay: habitTimeOfDay,
        habitLength: habitLength
      }
    ])
    habitInputHeight.value = windowHeight
    setInputIsShowing(false)
    clearText()
  }

  const clearText = () => {
    setHabitName('')
    setTextLength(20)
  }

  const setNameIsFocused = () => {
    setNameInputIsFocused(true)
  }

  const setNameNotFocused = () => {
    setNameInputIsFocused(false)
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
      <View style={ styles.nav }>
        <BottomNav addCallback={ showHabitInput }/>
      </View>
      <Animated.View style={[ styles.inputsContainer, habitInputStyles, shadow ]}>
        <NewHabitInput
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
          habitTime={habitTime}
          setHabitTime={setHabitTime}
          habitTimeOfDay={habitTimeOfDay}
          setHabitTimeOfDay={setHabitTimeOfDay}
          habitChain={habitChain}
          setHabitChain={setHabitChain}
          habitLength={habitLength}
          setHabitLength={setHabitLength}
        />
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
