import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { newHabitInputText } from '../../assets/appText'

//Components
import PressableWrapper from './PressableWrapper'
import Button from './Button';

//Theme
import { fontSizes, shadow, colors, sizes } from '../../theme/Variables'

const NewHabitInputProto = ({
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
    hideHabitInput
}) => {
  return (
    <View style={ styles.container }>
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
      <Text style={ styles.headerText }>{ newHabitInputText.header }</Text>
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
    </View>
  )
}

export default NewHabitInputProto

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        width: '100%',
        height: '100%',
        alignItems: 'center'
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
      textHeader: {
        fontSize: fontSizes.lg
      },
})