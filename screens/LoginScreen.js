import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import MyTheme from '../assets/MyTheme';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged( auth, (user) => {
            if (user) {
                console.log(user.uid, "navigating to home");
                navigation.replace("Home");
            }
        })

        return unsubscribe // unsubscribe from the listener so it doesn't keep running this function
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email, 'user created');
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user.email, 'signed in');
            })
            .catch((error) => {
                const errorCode = error.code;
                alert(error.message);
            })
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    Member Login
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
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
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

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    headerContainer: {
        width: '80%',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 2,
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
        marginTop: 8,
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
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 5,
    },
    button: {
        width: '100%',
        backgroundColor: MyTheme.colors.border,
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
        color: 'white',
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