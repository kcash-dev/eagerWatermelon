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
    const progressWidth = useSharedValue('0%')
    const color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')

    const onPress = () => {
        if (completed < 1) {
            setCompleted(completed + 1)
        }
    }

    useEffect(() => {
        if (completed === 1) {
            progressWidth.value = `100%`
        }
    }, [ completed ])

    const transitionConfig = {
        duration: 200
    }
    
    const progressWidthStyles = useAnimatedStyle(() => {
        return {
            width: withTiming(progressWidth.value, transitionConfig)
        }
    })

  return (
      <View style={{ marginVertical: 10 }}>
        <PressableWrapper
            pressOut={ onPress }
        >
            <View style={[ styles.container, shadow ]}>
                <Animated.View 
                    style={[
                        { 
                            backgroundColor: color, 
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
                    <Text>Today: { completed }/1</Text>
                </View>
                { completed === 1 ?
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
