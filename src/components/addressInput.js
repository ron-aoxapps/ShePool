import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Images from '../constants/images';
import googleAutocomplete from '../utils/permissions';

const AddressInput = ({
  title,
  inputRef,
  placeholder,
  leftIcon,
  value = '',
  onSelectAddress,
  ...props
}) => {
  const [address, setaddress] = useState('');
  const [addressModal, toggleAddressModal] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onClick = () => {
    toggleAddressModal(true);
  };

  const onPressAddress = res => {
    console.log('res', res);
    if (onSelectAddress) {
      onSelectAddress({address: res.description});
      toggleAddressModal(!addressModal);
    } else {
      toggleAddressModal(!addressModal);
    }
  };

  const onChangeText = async text => {
    const places = await googleAutocomplete(text);
    console.log('places', places);
    setAutoCompleteResult(places.predictions ?? []);
  };

  useEffect(() => {
    if (addressModal) {
      //   setAutoCompleteResult([]);
    }
  }, [addressModal]);

  return (
    <View>
      {title ? (
        <Text style={styles.headerTitle}>
          {title}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={onClick}
        style={[styles.container, title && {marginBottom: 10}]}>
        <Image source={Images.location} style={[styles.icon,{width:19,height:24}]} />

        {value == '' ? (
          <Text
            style={[styles.textInput, {color: 'red'}]}>
            {placeholder}
          </Text>
        ) : (
          <Text style={[styles.textInput]}>{value}</Text>
        )}
      </TouchableOpacity>

      <Modal visible={addressModal} transparent={false} animationType="slide">
        <View style={{flex: 1}}>
          <View style={[styles.modal]}>
            <View
              style={[styles.container, title && {marginBottom: 10}]}>
              <Image source={Images.location} style={[styles.icon,{width:19,height:24}]} />
              <TextInput
                ref={inputRef}
                {...props}
                autoFocus
                style={[styles.textInput]}
                autoCapitalize="none"
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType="default"
              />
            </View>
          </View>
          <FlatList
            data={autoCompleteResult}
            renderItem={({item, index}) => (
              <AddressItem
                address={item}
                onPress={() => onPressAddress(item)}
              />
            )}
            keyExtractor={(_, index) => index + ''}
          />
        </View>
      </Modal>
    </View>
  );
};

const AddressItem = ({address, onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.addressItem}>
        <Image
          style={[styles.icon, {tintColor: 'red'}]}
          source={Images.location}
        />
        <Text style={styles.addressText}>{address.description}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressInput;