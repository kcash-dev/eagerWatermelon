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
    const [ progressPercentage, setProgressPercentage ] = useState()
    const progressWidth = useSharedValue('0%')

    const onPress = () => {
        if (completed < item.goalFrequency) {
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
                        progressWidthStyles
                    ]}
                >
                </Animated.View>
                <View style={ styles.innerTextContainer }>
                    <Text style={ styles.text }>{ item.habitName }</Text>
                    <Text>{ item.goalType === 'day' ? `Today` : `This ${ item.goalType }` }: { completed }/{ goal }</Text>
                </View>
                { completed === item.goalFrequency ?
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
