import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Images from '../../constants/images';
import CountryInputText from '../../components/countryInputText';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [state, setState] = useState({
        mobileNumber: '',
        countryCode: {
            cca2: 'US',
            code: '1',
        },
    });

    const setFieldValue = (field, value) => {
        setState(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleNext = () => {
        console.log('Phone number:', `+${state.countryCode.code}${state.mobileNumber}`);
        navigation.navigate('OTP');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.content}>
                        <Image source={Images.loginScreenImages} style={styles.image} />
                        <Text style={styles.title}>Let's get started!</Text>
                        <Text style={styles.subtitle}>
                            Lorem ipsum dolor dummy typesetting industry for printing text
                        </Text>

                        <CountryInputText
                            code={state.countryCode}
                            onChangeCode={res => {
                                setFieldValue('countryCode', {
                                    code: res.code,
                                    cca2: res.cca2,
                                });
                            }}
                            onChangeText={text => {
                                setFieldValue('mobileNumber', text);
                            }}
                            value={state.mobileNumber}
                            placeholder={'Enter your mobile number'}
                        />

                        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>

                        <Text style={styles.copyright}>
                            Copyright © 2025 Shepool. All Rights reserved.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        width: '100%',
    },
    image: {
        width: 250,
        height: 196,
        marginTop: 10,
        alignSelf: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 40,
        textAlign: 'left',
        marginBottom: 10,
        color: '#3E4958',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#736F6F',
        textAlign: 'left',
        marginBottom: 30,
        lineHeight: 20,
    },
    nextButton: {
        backgroundColor: '#FF597A',
        width: '100%',
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    copyright: {
        fontSize: 16,
        fontWeight: 500,
        color: '#736F6F',
        textAlign: 'center',
        marginTop: 130,
    },
});

export default LoginScreen;