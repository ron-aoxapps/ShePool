import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import MapView, { Polyline } from "react-native-maps";
import Images from "../../constants/images";
import StarRating from 'react-native-star-rating-widget';
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/header";

const OnTheWayScreen = () => {
  const [activeTab, setActiveTab] = useState("DriverInfo");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);
  const [sosModal, setSosModal] = useState(false);
  const navigation = useNavigation();

  const handleCancleRide = () =>{
    setShowCancelModal(false)
    setShowConfirmCancelModal(true)
  }

  const initialRegion = {
    latitude: 40.739, 
    longitude: -73.819,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Polyline
          coordinates={[
            { latitude: 40.735, longitude: -73.82 },
            { latitude: 40.74, longitude: -73.81 },
          ]}
          strokeColor="black"
          strokeWidth={3}
        />
      </MapView>
      <View style={styles.header}>
        <Header image={Images.navBtn} title="Pickup location" color="#3E4958" />
        <View style={{ width: 24 }} /> 
      </View>
      {/* Cancel Ride Modal */}
      <Modal
        visible={showCancelModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source = {Images.car_top} style={styles.image}/>
            <Text style={styles.modalTitle}>
              Are you sure, you want to cancel this ride
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalYesButton}
                onPress={handleCancleRide}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalNoButton}
                onPress={() => setShowCancelModal(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* confirm cancle ride modal */}
      <Modal
        visible={showConfirmCancelModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source = {Images.cancelled} style={styles.image}/>
            <Text style={styles.modalTitle}>
              Your ride has been cancelled!
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalYesButton}
                onPress={() => setShowConfirmCancelModal(false)}
              >
                <Text style={styles.modalButtonText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sos modal  */}
      <Modal
        visible={sosModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSosModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source = {Images.cancelled} style={styles.image}/>
            <Text style={styles.modalTitle}>
              Are you sure , you want to{'\n'}send SOS message to your{'\n'}emergency contact 
            </Text>
            
           <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalYesButton}
                onPress={() => setSosModal(false)}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalNoButton}
                onPress={() => setSosModal(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "DriverInfo" && styles.activeTab]}
            onPress={() => setActiveTab("DriverInfo")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "DriverInfo" && styles.activeTabText,
              ]}
            >
              Driver Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Statistics" && styles.activeTab]}
            onPress={() => setActiveTab("Statistics")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Statistics" && styles.activeTabText,
              ]}
            >
              Statistics
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === "DriverInfo" ? (
          <View style={styles.content}>
            <View style={styles.profileContainer}>
              {/* Profile Image on Left */}
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/women/68.jpg" }}
                style={styles.profileImage}
              />
              
              {/* Driver Info on Right */}
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>Jene Iolese</Text>
                <Text style={styles.driverDetail}>
                  Car Number <Text style={styles.boldText}>HS785K</Text>
                </Text>
                <Text style={styles.driverDetail}>Volkswagen Jetta</Text>
              </View>
            </View>

            <View style={styles.ratingContainer}>
              <StarRating
                rating={4.5}
                starSize={20}
                color="#000000"
              />
              <Text style={styles.ratingText}>4.5</Text>
            </View>

            {/* OTP Section */}
            <View style={styles.otpContainer}>
              <View style={styles.otpRow}>
                <Image source={Images.messageIcon} style={styles.messageIcon} />
                <Text style={styles.otp}>5212</Text>
              </View>
              <Text style={styles.otpNote}>
                Please share this code to Vehicle Owner
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.callBtn} onPress={() => navigation.navigate('TripCompleted')}>
                <Text style={styles.btnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cancelBtn}
                onPress={() => setShowCancelModal(true)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sosBtn} onPress={() => setSosModal(true)}>
                <Text style={styles.btnText}>SOS</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            {/* Statistics Content - Matching Screenshot Design */}
            <View style={styles.statsContainer}>
              {/* Travel Cost and ETA Row */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Travel Cost</Text>
                  <Text style={styles.statValue}>$7.99</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>ETA</Text>
                  <Text style={styles.statValue}>12:45</Text>
                </View>
              </View>

              {/* Divider Line */}
              <View style={styles.divider} />

              {/* Locations Section */}
              <View style={styles.locationsContainer}>
                {/* Pickup Location */}
                <View style={styles.locationRow}>
                  <View style={styles.locationDot} />
                  <View style={styles.locationTextContainer}>
                    <Text style={styles.locationTitle}>Pickup Location</Text>
                    <Text style={styles.locationAddress}>Pcl chownk, Sector 59 Mohali</Text>
                  </View>
                </View>

                {/* Dropoff Location */}
                <View style={styles.locationRow}>
                  <View style={[styles.locationDot, styles.dropoffDot]} />
                  <View style={styles.locationTextContainer}>
                    <Text style={styles.locationTitle}>Dropoff Location</Text>
                    <Text style={styles.locationAddress}>Godrej Biotech, Sector 75 mohali</Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.statsButtonRow}>
                <TouchableOpacity style={styles.statsCallBtn}>
                  <Text style={styles.statsBtnText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.statsCancelBtn}
                  onPress={() => setShowCancelModal(true)}
                >
                  <Text style={styles.statsBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.statsSosBtn}
                  onPress={() => setSosModal(true)}
                >
                  <Text style={styles.statsBtnText}>SOS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default OnTheWayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3E4958",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  modalYesButton: {
    backgroundColor: "#FF597A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 50,
    left: -10,
    right: 0,
  },
  modalNoButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  image:{
    width:60,
    height:121
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  // Bottom Sheet Styles
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 5,
    paddingBottom: 20,
    maxHeight: "50%",
  },
  tabRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#A0A0A0",
  },
  tabText: {
    fontSize: 16,
    color: "#999",
  },
  activeTabText: {
    color: "#3E4958",
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },

  // Driver Info Styles
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    color:'#3E4958'
  },
  driverDetail: {
    fontSize: 15,
    fontWeight:'400',
    color: "#3E4958",
    marginBottom: 4,
  },
  boldText: {
    fontWeight: "700",
    fontSize:18,
    color:'#3E4958'
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  otpContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  otpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  messageIcon: {
    marginRight: 8,
    width: 21,
    height: 21
  },
  otp: {
    fontSize: 20,
    color: "#FF597A",
    fontWeight: "600",
  },
  otpNote: {
    fontSize: 14,
    fontWeight:'400',
    color: "#3E4958",
    marginTop:5
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  callBtn: {
    backgroundColor: "#FF597A",
    padding: 12,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#FF597A",
    padding: 12,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  sosBtn: {
    backgroundColor: "#FF2929",
    padding: 12,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },

  // Statistics Styles
  statsContainer: {
    padding: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3E4958",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#ddd",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
  locationsContainer: {
    marginVertical: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF597A",
    marginRight: 12,
    marginTop: 4,
  },
  dropoffDot: {
    backgroundColor: "#4CAF50",
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
    fontWeight: "500",
  },
  locationAddress: {
    fontSize: 14,
    color: "#3E4958",
    fontWeight: "600",
  },
  statsButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statsCallBtn: {
    backgroundColor: "#FF597A",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statsCancelBtn: {
    backgroundColor: "#FF597A",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statsSosBtn: {
    backgroundColor: "#FF2929",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statsBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});