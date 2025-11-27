import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Images from "../../constants/images";
import Header from "../../components/header";
import { useNavigation } from "@react-navigation/native";

const PickUpLocation = () => {
  const [pickupLocation, setPickupLocation] = useState("Pcl chowk, Phase 5");
  const navigation = useNavigation();
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleConfirmButton = () =>{
     navigation.navigate('DropOffLocation')
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
        />
      </MapView>
      <View style={styles.header}>
        <Header image={Images.navBtn} title="Pickup location" color="#3E4958" />
        <View style={{ width: 24 }} /> 
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Enter pickup location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />
        <Image source={Images.star}  style={styles.icon}/>
        <Image source={Images.gpsIcon}  style={styles.icon}/>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmButton}>
        <Text style={styles.confirmText}>Confirm Pickup Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: "absolute",
    top: 50,
    left: -10,
    right: 0,
  },
  searchBar: {
    position: "absolute",
    top: 110,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: 8,
    width:24,
    height:24
  },
  confirmButton: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#FF3B5C",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PickUpLocation;
