import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import CountryPicker from 'react-native-country-picker-modal';

const countryDefault = {
  cca2: 'US',
  code: '1',
};

const CountryInputText = ({
  title,
  style,
  code = countryDefault,
  onChangeText,
  placeholder,
  onFocus,
  value,
  inputRef,
  onChangeCode,
  disable,
  ...props
}) => {
  const [countryDetails, setCountryDetails] = useState(code);
  const [countryPickerVisibility, setCountryPickerVisibility] = useState(false);

  const onCountrySelect = country => {
    const newCountryDetails = {
      cca2: country.cca2,
      code: country.callingCode[0],
    };
    
    setCountryDetails(newCountryDetails);
    onChangeCode(newCountryDetails);
  };

  return (
    <>
      {title ? (
        <Text style={styles.headerTitle}>
          {title}
        </Text>
      ) : null}
      <View style={[styles.container, title && { marginBottom: 10 }, style]}>
        <TouchableOpacity
          disabled={disable}
          onPress={() => setCountryPickerVisibility(true)}
          style={styles.countryContainer}
        >
          <CountryPicker
            countryCode={code.cca2}
            withFilter
            withFlag
            withCallingCode
            withAlphaFilter
            withCallingCodeButton
            onSelect={onCountrySelect}
            visible={countryPickerVisibility}
            onClose={() => setCountryPickerVisibility(false)}
            containerButtonStyle={styles.countryPickerButton}
          />
         
        </TouchableOpacity>
        
        <View style={styles.seprator} />
        
        <TextInput
          ref={inputRef}
          editable={!disable}
          {...props}
          onChangeText={onChangeText}
          value={value}
          maxLength={10}
          placeholder={placeholder}
          placeholderTextColor="#999"
          style={styles.textinput}
          keyboardType="numeric"
          onFocus={onFocus}
          
        />
      </View>
    </>
  );
};

export default CountryInputText;