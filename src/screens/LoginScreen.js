import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth, signInWithEmailAndPassword } from '../api/firebase'
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

  const signIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user
        })
        .catch((error) => console.log(error))
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
          title='Login'
          bgColor={ colors.primary }
          textColor={ colors.secondary }
          callback={signIn}
        />
        <LoginButton 
          title='Register'
          bgColor={ colors.invalid }
          textColor={ colors.black }
          callback={() => navigation.navigate('RegisterScreen')}
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