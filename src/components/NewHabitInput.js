import { StyleSheet, Text, View, TextInput, FlatList, Alert } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  Layout,
  SlideOutLeft, 
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  SlideInLeft,
  FadeIn
} from 'react-native-reanimated';

//Components
import PressableWrapper from './PressableWrapper'
import Button from './Button';
import LengthButton from './LengthButton';

//Theme
import { fontSizes, shadow, colors, sizes } from '../../theme/Variables'
import TimeSelectionButton from './TimeSelectionButton';
import OtherHabitsChoices from './OtherHabitsChoices';

const NewHabitInput = ({
    habitName,
    setTextLength,
    setHabitName,
    setNameIsFocused,
    setNameNotFocused,
    maxTextLength,
    nameInputIsFocused,
    textLength,
    clearText,
    setNewHabit,
    hideHabitInput,
    habitTime,
    setHabitTime,
    habitTimeOfDay,
    setHabitTimeOfDay,
    habitChain,
    setHabitChain,
    habitLength,
    setHabitLength
}) => {
  const choices = [
    {
      name: 'Wake Up',
      backgroundColor: 'rgba(244, 211, 94, .8)',
      picture: 'https://i.imgur.com/32qnXAH.jpg'
    }, 
    {
      name: 'Brush Teeth',
      backgroundColor: 'rgba(218, 65, 103, .8)',
      picture: 'https://i.imgur.com/p0Oe6s2.jpg'
    },
    {
      name: 'Shower/Bathe',
      backgroundColor: 'rgba(172, 228, 170, .8)',
      picture: 'https://i.imgur.com/wGiEPpz.jpg'
    },
    {
      name: 'Eat Breakfast',
      backgroundColor: 'rgba(144, 112, 140, .8)',
      picture: 'https://i.imgur.com/VEJnC01.jpg'
    },
    {
      name: 'Go to Work',
      backgroundColor: 'rgba(191, 203, 194, .8)',
      picture: 'https://i.imgur.com/jcTgCVw.jpg'
    },
    {
      name: 'Eat Lunch',
      backgroundColor: 'rgba(144, 41, 35, .8)',
      picture: 'https://i.imgur.com/avNhtgR.jpg'
    },
    {
      name: 'Eat Dinner',
      backgroundColor: 'rgba(203, 156, 242, .8)',
      picture: 'https://i.imgur.com/TBjUaqh.jpg'
    },
    {
      name: 'Before Bed',
      backgroundColor: 'rgba(109, 177, 191, .8)',
      picture: 'https://i.imgur.com/rpNW7Vd.jpg'
    }
  ]

  const times = [
    {
      time: 'Morning',
      color: '#FE5F55',
      timeSchedules: [
        '4:00am', '4:15am', '4:30am', '4:45am',
        '5:00am', '5:15am', '5:30am', '5:45am',
        '6:00am', '6:15am', '6:30am', '6:45am',
        '7:00am', '7:15am', '7:30am', '7:45am',
        '8:00am', '8:15am', '8:30am', '8:45am',
        '9:00am', '9:15am', '9:30am', '9:45am',
        '10:00am', '10:15am', '10:30am', '10:45am',
        '11:00am', '11:15am', '11:30am', '11:45am',
      ]
    },
    {
      time: 'Afternoon',
      color: '#FCF6BD',
      timeSchedules: [
        '12:00pm', '12:15pm', '12:30pm', '12:45pm',
        '1:00pm', '1:15pm', '1:30pm', '1:45pm',
        '2:00pm', '2:15pm', '2:30pm', '2:45pm',
        '3:00pm', '3:15pm', '3:30pm', '3:45pm',
        '4:00pm', '4:15pm', '4:30pm', '4:45pm',
        '5:00pm', '5:15pm', '5:30pm', '5:45pm',
      ]
    },
    {
      time: 'Evening',
      color: '#8F2D56',
      timeSchedules: [
        '6:00pm', '6:15pm', '6:30pm', '6:45pm',
        '7:00pm', '7:15pm', '7:30pm', '7:45pm',
        '8:00pm', '8:15pm', '8:30pm', '8:45pm',
        '8:00pm', '8:15pm', '8:30pm', '8:45pm',
      ]
    },
    {
      time: 'Night',
      color: '#083D77',
      timeSchedules: [
        '9:00pm', '9:15pm', '9:30pm', '9:45pm',
        '10:00pm', '10:15pm', '10:30pm', '10:45pm',
        '11:00pm', '11:15pm', '11:30pm', '11:45pm',
        '12:00am', '12:15am', '12:30am', '12:45am',
        '1:00am', '1:15am', '1:30am', '1:45am',
        '2:00am', '2:15am', '2:30am', '2:45am',
        '3:00am', '3:15am', '3:30am', '3:45am',
      ]
    },
  ]

  const lengths = [
    { 
      name: '10 minutes',
      color: 'rgba(157, 226, 97, 0.8)'
    },
    {
      name: '15 minutes',
      color: 'rgba(241, 126, 252, 0.8)'
    },
    {
      name: '30 minutes',
      color: 'rgba(73, 12, 73, 0.8)'
    },
    { 
      name: '45 minutes',
      color: 'rgba(90, 155, 173, 0.8)'
    },
    {
      name: '1 hour',
      color: 'rgba(213, 226, 122, 0.8)'
    },
    { 
      name: '2 hours',
      color: 'rgba(140, 4, 20, 0.8)'
    }
  ]

  const namePosition = useSharedValue(0)
  const timePosition = useSharedValue(500)
  const timeOfDayPosition= useSharedValue(1000)
  const otherHabitPosition = useSharedValue(1500)
  const habitLengthPosition = useSharedValue(2000)
  const finishedSentencePosition = useSharedValue(2500)

  const transitionConfig = {
    duration: 200
  }

  const habitNameStyles = useAnimatedStyle(() => {
    return {
        transform: [{ translateX: withTiming(namePosition.value, transitionConfig) }]
    }
  })

  const timeStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(timePosition.value, transitionConfig) }]
    }
  })

  const timeOfDayStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(timeOfDayPosition.value, transitionConfig) }]
    }
  })

  const otherHabitStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(otherHabitPosition.value, transitionConfig) }]
    }
  })

  const habitLengthStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(habitLengthPosition.value, transitionConfig) }]
    }
  })

  const finishedSentenceStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(finishedSentencePosition.value, transitionConfig) }]
    }
  })

  const habitTimePress = (time) => {
    setHabitTime(time)
    timePosition.value = -500
    timeOfDayPosition.value = 0
    otherHabitPosition.value = 500
    habitLengthPosition.value = 1000
    finishedSentencePosition.value = 1500
  }

  const habitTimeOfDayPress = (time) => {
    setHabitTimeOfDay(time)
    timePosition.value = -1000
    timeOfDayPosition.value = -500
    otherHabitPosition.value = 0
    habitLengthPosition.value = 500
    finishedSentencePosition.value = 1000
  }

  const habitChainPress = (habit) => {
    setHabitChain(habit)
    timePosition.value = -1500
    timeOfDayPosition.value = -1000
    otherHabitPosition.value = -500
    habitLengthPosition.value = 0
    finishedSentencePosition.value = 500
    function random_rgba() {
      var o = Math.round, r = Math.random, s = 255;
      return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + '0.8' + ')';
    }
  
    let color = random_rgba();
    choices.push({
      name: habitName,
      color: color,
    })
  }

  const habitLengthPress = (length) => {
    setHabitLength(length)
    timePosition.value = -2000
    timeOfDayPosition.value = -1500
    otherHabitPosition.value = -1000
    habitLengthPosition.value = -500
    finishedSentencePosition.value = 0
  }

  console.log(habitTime, 'habittime')
  return (
    <View style={ styles.container }>
      <Animated.View 
        style={{ alignItems: 'center' }}
        exiting={SlideOutLeft}
        style={ habitNameStyles }
      >
        <View style={[ styles.inputContainer, shadow, { backgroundColor: nameInputIsFocused ? colors.white : colors.invalid } ]}>
          <TextInput 
            value={ habitName }
            onChangeText={(text) => {
              setTextLength(maxTextLength - text.length)
              setHabitName(text) 
            }}
            style={[ styles.habitInput ]}
            autoCorrect
            placeholder='Enter a habit name'
            onFocus={ setNameIsFocused }
            onBlur={ setNameNotFocused }
            maxLength={ maxTextLength }
          />
          { nameInputIsFocused ? 
              <Text>{ textLength }</Text>
              :
              null
          }
          <PressableWrapper
              pressOut={ clearText }
          >
            <MaterialCommunityIcons 
              name="close-circle" 
              size={ sizes.lg } 
              color={ colors.invalid } 
            />
          </PressableWrapper>
        </View>
        <View style={ styles.textContainer }>
          <PressableWrapper
            pressOut={() => {
              if (habitName) {
                namePosition.value = -500
                timePosition.value = 0
                otherHabitPosition.value = 500
              } else {
                Alert.alert('You need to enter a habit name.')
              }
            }}
          >
            <Text style={ styles.text }>Next</Text>
          </PressableWrapper>
        </View>
      </Animated.View>
      <Animated.View 
        style={[ styles.timeContainer, shadow, timeStyles ]}
        exiting={SlideOutLeft}
        entering={SlideInLeft}
        layout={Layout.springify()}
      >
        <Text>When would you like to { habitName.toLowerCase() }?</Text>
        <FlatList 
          data={ times }
          renderItem={({ item }) => (
            <TimeSelectionButton item={ item } callback={ habitTimePress }/>
          )}
          keyExtractor={item => item.color}
        />
      </Animated.View>
      <Animated.View 
        style={[ styles.timeContainer, shadow, timeOfDayStyles ]}
        exiting={SlideOutLeft}
        entering={SlideInLeft}
        layout={Layout.springify()}
      >
        <Text>Choose a time:</Text>
        <FlatList 
          data={ habitTime.timeSchedules }
          renderItem={({ item }) => (
            <View style={ styles.timeSchedule }>
              <PressableWrapper
                pressOut={() => habitTimeOfDayPress(item) }
              >
                <Text style={ styles.timeScheduleText }>{ item }</Text>
              </PressableWrapper>
            </View>
          )}
          keyExtractor={item => item}
          numColumns={ 4 }
        />
      </Animated.View>
      <Animated.View 
        style={[ styles.animatedViewsContainer, otherHabitStyles ]}
        exiting={SlideOutLeft}
        entering={SlideInLeft}
        layout={Layout.springify()}
      >
        <Text style={ styles.text }>Let's chain this to an existing habit. Pick one.</Text>
        <FlatList 
          data={ choices }
          renderItem={({ item }) => (
            <OtherHabitsChoices item={ item } callback={ habitChainPress }/>
          )}
          keyExtractor={item => item.name}
          numColumns={2}
        />
      </Animated.View>
      <Animated.View 
        style={[ styles.animatedViewsContainer, habitLengthStyles ]}
        exiting={SlideOutLeft}
        entering={SlideInLeft}
        layout={Layout.springify()}
      >
        <Text style={ styles.text }>How long do you want to { habitName.toLowerCase() } after you { habitChain.name?.toLowerCase() }?</Text>
        <FlatList 
          data={ lengths }
          renderItem={({ item }) => (
            <LengthButton item={ item } callback={ habitLengthPress } />
          )}
          contentContainerStyle={{ width: '100%', marginTop: '10%' }}
          keyExtractor={item => item.name}
          numColumns={2}
        />
      </Animated.View>
      <Animated.View 
        style={[ styles.animatedViewsContainer, finishedSentenceStyles ]}
        exiting={SlideOutLeft}
        entering={SlideInLeft}
        layout={Layout.springify()}
      >
        <Text style={[ styles.text, { marginBottom: '10%' } ]}>Say this out loud:</Text>
        <Animated.Text 
          style={ styles.text }
          entering={FadeIn.delay(300)}
          layout={Layout.springify()}
        >
            After I <Text style={[ styles.text, { color: colors.secondary, backgroundColor: colors.primary } ]}>{ habitChain.name?.toUpperCase() }</Text> at <Text style={[ styles.text, { color: colors.secondary, backgroundColor: colors.primary } ]}>{ habitTimeOfDay }</Text>, I will <Text style={[ styles.text, { color: colors.secondary, backgroundColor: colors.primary } ]}>{ habitName?.toUpperCase() }</Text> for <Text style={[ styles.text, { color: colors.secondary, backgroundColor: colors.primary } ]}>{ habitLength?.toUpperCase() }</Text> every <Text style={[ styles.text, { color: colors.secondary, backgroundColor: colors.primary } ]}>{ habitTime?.time.toUpperCase() }</Text>.
        </Animated.Text>
        <View style={ styles.button }>
          <Button 
            title="Sounds good."
            bgColor={ colors.primary }
            textColor={ colors.secondary }
            callback={ setNewHabit }
          />
        </View>
      </Animated.View>
    </View>
    
  )
}

export default NewHabitInput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: fontSizes.sm,
        textAlign: 'center'
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
        width: '80%',
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
      button: {
        marginTop: sizes.xxl
      },
      textHeader: {
        fontSize: fontSizes.lg
      },
      textContainer: {
        marginVertical: sizes.xxl
      },
      text: {
        fontSize: fontSizes.lg,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      timeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
      },
      animatedViewsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: '100%'
      },
      beforeOrAfterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        marginVertical: sizes.xxl
      },
      timeSchedule: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center'
      },
      timeScheduleText: {
        paddingVertical: sizes.sm,
        fontSize: fontSizes.md,
        textAlign: 'center'
      }
})