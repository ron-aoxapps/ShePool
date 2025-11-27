import React, { useState } from "react";
import { 
  Image, 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView 
} from "react-native";
import Images from "../../constants/images";
import ImagePicker from '../../components/imagePicker';
import CountryInputText from '../../components/countryInputText';
import AddressInput from '../../components/addressInput';
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/header";

const initialState = {
  firstName: '',
  lastName: '',
  profileImage: '',
  email: '',
  mobileNumber: '',
  address: '',
  countryCode: {
    cca2: 'US',
    code: '1',
  },
  idProof: '',
  idProofImage: null
};

const Register = () => {
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();
  const setFieldValue = (field, value) => {
    setState(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

 const handleSignUp = () => {
  console.log('Registration data:', state);
  navigation.reset({ 
    index: 0, 
    routes: [{ name: 'Main' }] 
  });
};


  const handleIdProofUpload = (imageUri) => {
    setFieldValue('idProofImage', imageUri);
    setFieldValue('idProof', 'ID Proof Uploaded');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header image={Images.navBackbtn} title="Register" color="#3E4958" type="back" />
        <View style={{ width: 24 }} /> 
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Profile Image Picker */}
        <ImagePicker
          local
          onImageSelect={url => {
            setFieldValue('profileImage', url);
          }}>
          <View style={{ alignSelf: 'center', marginBottom: 30 }}>
            <Image
              source={
                state.profileImage
                  ? { uri: state.profileImage }
                  : Images.profilePlaceholder
              }
              style={styles.profileImage}
            />
            <View style={styles.camIcon}>
              <Image source={Images.camera} style={{width: 28, height: 28}}/>
            </View>
          </View>
        </ImagePicker>

        {/* Name Fields with Avatar Icons */}
        <View style={styles.nameContainer}>
          <View style={[{ flex: 1, marginRight: 10 }]}>
            <View style={styles.inputWithIcon}>
              <Image source={Images.avatar} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.inputWithIconPadding]}
                placeholder="First name"
                value={state.firstName}
                onChangeText={(text) => setFieldValue('firstName', text)}
              />
            </View>
          </View>
          
          <View style={[{ flex: 1 }]}>
            <View style={styles.inputWithIcon}>
              <Image source={Images.avatar} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.inputWithIconPadding]}
                placeholder="Last name"
                value={state.lastName}
                onChangeText={(text) => setFieldValue('lastName', text)}
              />
            </View>
          </View>
        </View>

        {/* Email Field with Icon */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWithIcon}>
            <Image source={Images.email} style={[styles.inputIcon,{width:19,height:17}]} />
            <TextInput
              style={[styles.input, styles.inputWithIconPadding]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={state.email}
              onChangeText={(text) => setFieldValue('email', text)}
            />
          </View>
        </View>

        {/* Phone Number Field */}
        <View style={styles.inputContainer}>
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
            placeholder="Enter your mobile number"
          />
        </View>

        {/* Address Field */}
        <View style={styles.inputContainer}>
          <AddressInput
            title="Enter Address"
            value={state.address}
            // onSelectAddress={handleAddressSelect}
          />
        </View>

        {/* ID Proof Field with Icon and Upload Button */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWithIcon}>
            <Image source={Images.idCard} style={[styles.inputIcon,{width:37,height:37}]} />
            <TextInput
              style={[styles.input, styles.inputWithIconPadding]}
              placeholder="Id proof"
              value={state.idProof}
              onChangeText={(text) => setFieldValue('idProof', text)}
              editable={false} // Make it non-editable since we're uploading image
            />
            <ImagePicker
              local
              onImageSelect={handleIdProofUpload}
              style={styles.uploadButton}
            >
              <Image source={Images.uploadIcon} style={styles.uploadIcon} />
            </ImagePicker>
          </View>
          
          {state.idProofImage && (
            <View style={styles.idProofPreview}>
              <Image 
                source={{ uri: state.idProofImage }} 
                style={styles.idProofImage}
              />
              <Text style={styles.idProofText}>ID Proof Uploaded</Text>
            </View>
          )}
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 20,
    paddingTop: 40,
  },
  profileImage: {
    height: 126,
    width: 126,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    alignSelf: 'center',
  },
  camIcon: {
    position: 'absolute',
    borderRadius: 25,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 18,
    backgroundColor: '#F7F8F9',
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginLeft: 15,
    marginRight: 10,
    tintColor: 'black',
  },
  inputWithIconPadding: {
    paddingLeft: 0,
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 50,
    left: -10,
    right: 0,
  },
  input: {
    borderRadius: 18,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F7F8F9',
    borderWidth: 0,
  },
  uploadButton: {
    padding: 10,
    marginRight: 10,
  },
  uploadIcon: {
    width: 19,
    height: 19,
    tintColor: 'black',
  },
  idProofPreview: {
    marginTop: 10,
    alignItems: 'center',
  },
  idProofImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  idProofText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  signUpButton: {
    backgroundColor: '#FF597A',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});