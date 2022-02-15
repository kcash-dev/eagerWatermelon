import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

//Components
import PressableWrapper from './PressableWrapper'
import { colors, fontSizes, shadow } from '../../theme/Variables'

const OtherHabitsChoices = ({ item, callback }) => {
    const handleCallback = (habit) => {
        callback(habit)
    }
  return (
      <View style={ shadow }>
        <PressableWrapper
            pressOut={() => handleCallback(item)}
        >
                <View style={ styles.container }>
                    <ImageBackground
                        source={{ uri: item.picture }}
                        style={[ { width: '100%', height: '100%', borderRadius: 8 }, styles.imageBackground ]}
                        resizeMode='cover'
                        imageStyle={{ borderRadius: 8 }}
                    >
                        <View style={[styles.overlay, { backgroundColor: item.backgroundColor } ]} />
                        <Text style={ styles.titleText }>{ item.name }</Text>
                    </ImageBackground>
                </View>
        </PressableWrapper>
      </View>
  )
}

export default OtherHabitsChoices

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 8,
        padding: 5
    },
    imageBackground: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 8,
    },
    titleText: {
        color: colors.white,
        fontSize: fontSizes.md,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})