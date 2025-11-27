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
};

const EditProfile = () => {
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();
  
  const setFieldValue = (field, value) => {
    setState(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Profile data saved:', state);
    navigation.goBack(); // Go back instead of resetting to main
  };

  return (
    <SafeAreaView style={styles.container}>
    <Header image={Images.navBtn} title="Edit Profile" color="#3E4958"/>
      <ScrollView contentContainerStyle={styles.scrollView}>
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
        
        <View style={styles.inputContainer}>
          <AddressInput
            title="Enter Address"
            value={state.address}
            onSelectAddress={(address) => setFieldValue('address', address)}
          />
        </View>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  scrollView:{
    paddingLeft:20,
    paddingRight:20
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
  input: {
    borderRadius: 18,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F7F8F9',
    borderWidth: 0,
  },
  saveButton: {
    backgroundColor: '#FF597A',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;