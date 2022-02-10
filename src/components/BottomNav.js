import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//Components
import PressableWrapper from './PressableWrapper'

//Theme
import { sizes, colors, shadow } from '../../theme/Variables'

const BottomNav = ({ addCallback }) => {
    const navigation = useNavigation()
  return (
    <View style={ styles.container }>
        <View>
            <PressableWrapper
                pressOut={() => navigation.navigate('Settings')}
            >
                <MaterialIcons name="settings" size={sizes.xxl} color={ colors.secondary } />
            </PressableWrapper>
        </View>
        <View>
            <PressableWrapper
                pressOut={ addCallback }
            >
                <MaterialCommunityIcons name="plus-circle" size={sizes.xxxl + sizes.md} color={ colors.primary } />    
            </PressableWrapper>
        </View>
        <View>
            <PressableWrapper
                pressOut={() => navigation.navigate('Stats')}
            >
                <MaterialCommunityIcons name="graphql" size={sizes.xxl} color={ colors.secondary } />
            </PressableWrapper>
        </View>
    </View>
  )
}

export default BottomNav

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
})