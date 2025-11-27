import React, {useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { requestCameraPermission } from '../utils/permissions';

// import { useDispatch } from 'react-redux';

const ImagePicker = ({
  local,
  children,
  onImageSelect,
  style,
  uploadingStatus = () => {},
}) => {
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);


  const onResponse = data => {
    if (local) {
      onImageSelect(
        data,
        // Platform.select({android: data, ios: data.replace('file://', '')}),
      );
    } else {
      setUploading(true);
      uploadingStatus(true);
      console.log('data', data);

      const profiledata = new FormData();

      profiledata.append('files', {
        uri: Platform.OS === 'android' ? data : data.replace('file://', ''),
        type: 'image/jpeg',
        name: 'Images',
      });

      const callback = res => {
        setUploading(false);
        uploadingStatus(false);

        if (res.status == 'success') {
          onImageSelect(res.response);
        }

        console.log('respose imageUplod', res);
      };
    //   dispatch(uploadImageRequest({data: profiledata, callback}));
    }
  };

  const cameraPicker = async () => {
    const permissionResponse = await requestCameraPermission();

    if (permissionResponse.isGraned) {
      setVisible(false);
      launchCamera(
        {mediaType: 'photo', cameraType: 'front', quality: 0.5},
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            onResponse(response.assets[0].uri);
          }
        },
      );
    }
  };

  const galleryPicker = () => {
    try {
      setVisible(false);
      launchImageLibrary({mediaType: 'photo', quality: 0.5}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          onResponse(response.assets[0].uri);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = type => {
    switch (type) {
      case 'camera':
        cameraPicker();
        break;

      case 'gallery':
        galleryPicker();
        break;

      default:
        cameraPicker();
    }
  };

  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        disabled={uploading}
        style={style}
        onPress={() => onOpen()}>
        {children}
        {uploading && (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <ActivityIndicator size={'small'} color='red' />
          </View>
        )}
      </TouchableOpacity>
      <Modal animationType="slide" visible={visible} transparent>
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <View style={styles.modalContainer}>
            <View style={styles.bottomSheetContainer}>
              <TouchableOpacity
                style={styles.actionSheetButton}
                onPress={() => pickImage('camera')}>
                <Text font={'semiBold'} style={styles.actionButtonWhite}>
                  Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionSheetButton}
                onPress={() => pickImage('gallery')}>
                <Text font={'semiBold'} style={styles.actionButtonWhite}>
                  Gallery
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionSheetButton,
                  {
                    marginTop: 10,
                    backgroundColor: 'white',
                    // ...commonStyle.shadow,
                  },
                ]}
                onPress={() => onClose()}>
                <Text font={'semiBold'} style={styles.actionButton}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
            <SafeAreaView style={{backgroundColor: '#F0F0F1'}} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Platform.select({ios: '#1C1C1E90', android: '#1C1C1E60'}),
  },
  bottomSheetContainer: {
    // backgroundColor: "#1C1C1E",
    backgroundColor: '#F0F0F1',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  actionButtonWhite: {
    // color: 'white',
  },
  actionButton: {
    color: 'red',
  },
  actionSheetButton: {
    marginVertical: 5,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
