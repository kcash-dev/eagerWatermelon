import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, sizes, shadow } from '../../theme/Variables';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from 'react-native-reanimated';

//Components
import PressableWrapper from './PressableWrapper';

const HabitContainer = ({ item }) => {
    const [ completed, setCompleted ] = useState(0)
    const [ goal, setGoal ] = useState(item.goalFrequency)
    const progressWidth = useSharedValue('0%')
    const [ dailyGoal, setDailyGoal ] = useState()

    // const setDailyGoal = () => {
    //     if (item.goalType === 'day') {
    //         setDailyGoal(item.goalFrequency)
    //     } else if (item.goalType === 'week') {
    //         setDailyGoal(item.goalFrequency / item.daysToTrack.length)
    //     } else if (item.goalType === 'year') {}
    // }

    const onPress = () => {
        if (completed < dailyGoal) {
            setCompleted(completed + 1)
        }
    }

    useEffect(() => {
        const percentage = (completed / goal) * 100
        progressWidth.value = `${percentage}%`
    }, [ completed ])

    const transitionConfig = {
        duration: 200
    }
    
    const progressWidthStyles = useAnimatedStyle(() => {
        return {
            width: withTiming(progressWidth.value, transitionConfig)
        }
    })

    console.log(item)

  return (
      <View style={{ marginVertical: 10 }}>
        <PressableWrapper
            pressOut={ onPress }
        >
            <View style={[ styles.container, shadow ]}>
                <Animated.View 
                    style={[
                        { 
                            backgroundColor: item.color, 
                            height: '100%', 
                            borderRadius: 8,
                            position: 'absolute' 
                        },
                        progressWidthStyles,
                        shadow
                    ]}
                >
                </Animated.View>
                <View style={ styles.innerTextContainer }>
                    <Text style={ styles.text }>{ item.habitName }</Text>
                    <Text>{ item.goalType === 'day' ? `Today` : `This ${ item.goalType }` }: { completed }/{ goal }</Text>
                </View>
                { completed === dailyGoal ?
                    <View style={[ styles.checkContainer ]}>
                        <MaterialCommunityIcons 
                            name="check-bold" 
                            size={sizes.xl}
                            color={ colors.green }
                        />
                    </View>
                    :
                    null
                }
            </View>
        </PressableWrapper>
      </View>
  );
};

export default HabitContainer;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.invalid,
        borderRadius: 8,
        justifyContent: 'space-between'
    },
    innerTextContainer: {
        paddingLeft: sizes.sm,
        paddingVertical: sizes.sm
    },
    text: {
        fontSize: sizes.xl
    },
    background: {
        backgroundColor: colors.black,
        borderRadius: sizes.xxxl * 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: sizes.sm,
    },
    checkContainer: {
        paddingRight: sizes.sm
    }
});
