import { StyleSheet, FlatList, View, TextInput, Dimensions, Text, Keyboard } from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';
import BottomNav from '../components/BottomNav';

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
  const [ textLength, setTextLength ] = useState(20)
  const [ maxTextLength, setMaxTextLength ] = useState(20)

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
      console.log(newArray, 'NEW')
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
        <ScrollView
          style={ styles.scrollContainer }
          contentContainerStyle={{ alignItems: 'center' }}
          keyboardShouldPersistTaps='handled'
        >
          <View style={ styles.heading }>
            <Text style={ styles.textHeader }>Create</Text>
            <View style={ styles.buttons }>
              <Button 
                title="Save"
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
          </View>
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
              <MaterialCommunityIcons name="close-circle" size={ sizes.lg } color={ colors.invalid } />
            </PressableWrapper>
          </View>
          <View style={[ styles.selectContainer ]}>
            <Text>Are you building or quitting a habit?</Text>
            <View style={ styles.innerSelectContainer }>
              <PressableWrapper
                pressOut={ setSelectedToBuild }
              >
                <View style={ buildOrQuit === 'Build' ? [styles.selectedBackground, shadow] : null }>
                  <Text style={ styles.selectText }>Build</Text>
                </View>
              </PressableWrapper>
              <PressableWrapper
                pressOut={ setSelectedToQuit }
              >
                <View style={ buildOrQuit === 'Quit' ? [styles.selectedBackground, shadow] : null }>
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
                <View style={ goalType === 'day' ? [[styles.selectedBackground, shadow], shadow] : null }>
                  <Text style={ styles.selectText }>Daily</Text>
                </View>
              </PressableWrapper>
              <PressableWrapper
                pressOut={ setSelectedToWeekly }
              >
                <View style={ goalType === 'week' ? [styles.selectedBackground, shadow] : null }>
                  <Text style={ styles.selectText }>Weekly</Text>
                </View>
              </PressableWrapper>
              <PressableWrapper
                pressOut={ setSelectedToYearly }
              >
                <View style={ goalType === 'year' ? [styles.selectedBackground, shadow] : null }>
                  <Text style={ styles.selectText }>Yearly</Text>
                </View>
              </PressableWrapper>
            </View>
          </View>
          <View style={[ styles.selectContainer ]}>
            <Text>How often do you want to do this goal?</Text>
            <View style={ styles.innerSelectContainer }>
              <View style={ styles.daySelector }>
                <PressableWrapper
                  pressOut={() => removeOrAddDay('Monday')}
                >
                  <View style={ daysToTrack.includes('Monday') ? [styles.selectedBackground, shadow] : null }>
                    <Text style={ styles.daySelectText }>Monday</Text>
                  </View>
                </PressableWrapper>
                <PressableWrapper
                  pressOut={() => removeOrAddDay('Tuesday')}
                >
                  <View style={ daysToTrack.includes('Tuesday') ? [styles.selectedBackground, shadow] : null }>
                    <Text style={ styles.daySelectText }>Tuesday</Text>
                  </View>
                </PressableWrapper>
                <PressableWrapper
                  pressOut={() => removeOrAddDay('Wednesday')}
                >
                  <View style={ daysToTrack.includes('Wednesday') ? [styles.selectedBackground, shadow] : null }>
                    <Text style={ styles.daySelectText }>Wednesday</Text>
                  </View>
                </PressableWrapper>
                <PressableWrapper
                  pressOut={() => removeOrAddDay('Thursday')}
                >
                  <View style={ daysToTrack.includes('Thursday') ? [styles.selectedBackground, shadow] : null }>
                    <Text style={ styles.daySelectText }>Thursday</Text>
                  </View>
                </PressableWrapper>
                <PressableWrapper
                  pressOut={() => removeOrAddDay('Friday')}
                >
                  <View style={ daysToTrack.includes('Friday') ? [styles.selectedBackground, shadow] : null }>
                    <Text style={ styles.daySelectText }>Friday</Text>
                  </View>
                </PressableWrapper>
                <PressableWrapper
                  pressOut={() => removeOrAddDay('Saturday')}
                >
                  <View style={ daysToTrack.includes('Saturday') ? [styles.selectedBackground, shadow] : null }>
                    <Text style={ styles.daySelectText }>Saturday</Text>
                  </View>
                </PressableWrapper>
                <PressableWrapper
                  pressOut={() => removeOrAddDay('Sunday')}
                >
                  <View style={ daysToTrack.includes('Sunday') ? [styles.selectedBackground, shadow] : null }>
                    <Text style={ styles.daySelectText }>Sunday</Text>
                  </View>
                </PressableWrapper>
              </View>
            </View>
            <View style={[ styles.innerSelectContainer, shadow ]}>
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
          <View style={[ styles.inputContainer, shadow, { backgroundColor: groupInputIsFocused ? colors.white : colors.invalid } ]}>
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
          </View>
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
        </ScrollView>
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
    }
});
