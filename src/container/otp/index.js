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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header';

const OTPScreen = () => {
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
    // Handle next action here
    navigation.navigate('Register')
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
         <Header image={Images.navBackbtn} title="Enter Code" color="#3E4958" type="back" />
        <View style={{ width: 24 }} /> 
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
      
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <Image source={Images.otpScreenImage} style={styles.image}/>
            <Text style={styles.title}>A code has been sent to {'\n'}+1 9876543210 via SMS</Text>
            <OTPInputView
            pinCount={4}
            style={styles.otpContainer}
            code={state.otp}
            onCodeChanged={code => {
              setState(prev => ({...prev, otp: code}));
            }}
            autoFocusOnLoad={false}
            placeholderCharacter="-"
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          />
            <Text style={styles.resendText}>Resend Code</Text>
            <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
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
  header: {
    position: "absolute",
    top: 50,
    left: -10,
    right: 0,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    width: '100%',
  },
  image: {
    width: 224,
    height: 191,
    marginTop: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 20,
    lineHeight:20,
    letterSpacing:1,
    textAlign: 'center',
    marginBottom: 10,
    color: '#3E4958',
  },
    otpContainer: {
    width: '60%',
    height: 80,
    alignSelf: 'center',
    marginVertical: 20,
  },
  underlineStyleBase: {
    width: 50,
    height: 60,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: '#2E2D2B',
    color: '#000000',
    fontSize: 36,
    fontWeight: '800',
    lineHeight:32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  underlineStyleHighLighted: {
    borderColor: '#000000',
    color: '#000000',
    fontSize: 36,
    fontWeight: '800',
    lineHeight:32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  resendText:{
     fontWeight:'600',
     fontSize:14,
     alignSelf:'center',
     color:'#FC2103',
     marginTop:20
  },
  submitButton: {
    backgroundColor: '#FF597A',
    width: '100%',
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 160,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTPScreen;