import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendSignInLinkToEmail, GoogleAuthProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import MyTheme from '../assets/MyTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmailLoginScreen = () => {
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged( auth, (user) => {
            if (user) {
                console.log(user.uid, "navigating to home");
                navigation.replace("Home");
            }
        })

        return unsubscribe // unsubscribe from the listener so it doesn't keep running this function
    }, []);

    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:19000',
        // This must be true.
        handleCodeInApp: true,
      };
    
    const sendSignInLink = () => {
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                console.log("input: ", email);
                AsyncStorage.setItem('emailForSignIn', email);
                alert(`Login link sent to ${email}`);
                navigation.navigate('EmailLinkHandler');
            })
            .catch((error) => {
                alert(error.message);
                // ...
            });
    }

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email, 'user created');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Email address is already in use, please sign in.');
                } else if (error.code === 'auth/invalid-email') {
                    alert('Email address is invalid, please use a different email.');
                } else {
                    alert(error.message);
                }
            })
    }

    const handleLogin = () => {
        navigation.navigate('LoginScreen');
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    Light-speed Login
                </Text>
                <Text style={styles.paragraphText}>
                    Enter the email address that you registered with and we'll send you a link to log in. 
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={sendSignInLink}
                    style={styles.buttonEmailInput}
                >
                    <Text style={styles.buttonText}>Send Link</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{width: '80%', margin: 15, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: MyTheme.colors.border}} />
            </View>

            <Text style={[styles.paragraphText, {width: '80%', alignItems: 'center', textAlign: 'center'}]}>
                Or, you can login with your email and password. 
            </Text>
   
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonTextLogin}>Login</Text>
                </TouchableOpacity>
                

            </View>

            <View style={{width: '80%', margin: 15, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: MyTheme.colors.border}} />
            </View>

            <View style={styles.buttonContainer}>
                <Text style={styles.paragraphText}>
                    Not a member yet? 
                </Text>
                <TouchableOpacity
                        onPress={handleSignUp}
                        style={styles.paragraphText}
                    >
                        <Text style={styles.buttonOutlineText}>Get Started.</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    )
}

export default EmailLoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    headerContainer: {
        width: '80%',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 10,
    },
    paragraphText: {
        fontSize: 15,
        marginBottom: 5,
        textAlign: 'center',
    },  
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        height: 40,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonEmailInput: {
        backgroundColor: MyTheme.colors.highlight,
        width: '100%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 5,
    },
    button: {
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 25,
        borderColor: 'grey',
        alignItems: 'center',
        marginTop: 5,
        beight: 40, 
    },
    buttonText: {
        color: 'black',
        fontWeight: '400',
        fontSize: 14,
    },
    buttonTextLogin: {
        color: 'grey',
        fontWeight: '400',
        fontSize: 14,
    },
    buttonOutline: {
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 2

    },
    buttonOutlineText: {
        color: 'grey',
        textDecorationLine: 'underline',
        textDecorationColor: MyTheme.colors.highlight,
        fontWeight: '700',
        fontSize: 16,
    },


})