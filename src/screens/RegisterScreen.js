import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth, createUserWithEmailAndPassword } from '../api/firebase'
import { colors, sizes } from '../../theme/Variables'

//Components
import LoginButton from '../components/LoginButton'

const LoginScreen = () => {
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser) {
            navigation.replace('HomeNav')
        }
    });

    return unsubscribe;
  }, [])

  const register = () => {
    if (auth && email && password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                userCredentials.user.displayName = name;
                userCredentials.user.photoURL = photoURL;
                setUserInfoFirestore()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
    } else if (!email) {
        Alert.alert('You must fill in a valid email.')
    } else if (!password) {
        Alert.alert('You must fill in a valid password.')
    }
}

  return (
    <KeyboardAvoidingView>
      <View style={ styles.inputContainer }>
        <TextInput 
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          clearButtonMode='always'
          activeOutlineColor={ colors.black }
          placeholder="Email"
          autoCapitalize='none'
          autoCorrect={false}
          style={ styles.input }
        />
        <TextInput 
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          clearButtonMode='always'
          activeOutlineColor={ colors.black }
          placeholder="Password"
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
          style={ styles.input }
        />
      </View>
      <View style={ styles.buttonContainer }>
        <LoginButton 
          title='Register'
          bgColor={ colors.primary }
          textColor={ colors.secondary }
          callback={register}
        />
        <LoginButton 
          title='Login'
          bgColor={ colors.invalid }
          textColor={ colors.black }
          callback={() => navigation.navigate('LoginScreen')}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    borderRadius: sizes.sm
  },
  input: {
    width: '90%',
    padding: sizes.md,
    backgroundColor: colors.white,
    borderRadius: sizes.sm,
    marginVertical: sizes.sm,
  },
  buttonContainer: {
    width: '100%'
  }
})