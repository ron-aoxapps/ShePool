import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Calendar } from "react-native-calendars";
import Images from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/header";

const RideOption = () => {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState("Standard");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("card_1");

  const initialRegion = {
    latitude: 40.7282,
    longitude: -73.7949,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const cars = [
    { id: "1", name: "Standard", price: "$ 9.99", image: Images.standard },
    { id: "2", name: "Accessibility", price: "$ 15.99", image: Images.acessibility },
    { id: "3", name: "Ride XL", price: "$ 20.99", image: Images.van },
    { id: "4", name: "Premium", price: "$ 25.99", image: Images.avatar },
    { id: "5", name: "Luxury", price: "$ 40.99", image: Images.avatar },
  ];

  const coupons = [
    { id: "1", title: "Get 25% Off", description: "Get 25% Off UPTO $10 on your first 2 maxi rides.", code: "MAX12500" },
    { id: "2", title: "Get 25% Off", description: "Get 25% Off UPTO $10 on your first 2 maxi rides.", code: "MAX12500" },
    { id: "3", title: "Get 20% Off", description: "Get 20% Off on all rides this weekend.", code: "WEEKEND20" },
    { id: "4", title: "Free Ride", description: "Get your first ride free with this code.", code: "FREERIDE" },
    { id: "5", title: "Free Ride", description: "Get your first ride free with this code.", code: "FREERIDE" },
  ];

  const paymentMethods = [
    {
      id: "card_1",
      type: "Master Card",
      number: "4584",
      icon: "💳",
      cardIcon: "🔴"
    },
    {
      id: "card_2",
      type: "Visa Card",
      number: "1617",
      icon: "💳",
      cardIcon: "🔵"
    }
  ];

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const handleCouponSelect = (coupon) => {
    setSelectedCoupon(coupon.code);
    setShowCouponModal(false);
  };

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment.id);
    setShowPaymentModal(false);
  };

  const getSelectedPayment = () => {
    return paymentMethods.find(payment => payment.id === selectedPayment);
  };

  const handlePickUpBtn = () => {
  navigation.navigate('Main', { 
    screen: 'OnTheWay' 
  });
}

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        <Marker coordinate={{ latitude: 40.7282, longitude: -73.7949 }}>
          <View style={styles.pickupMarker} />
        </Marker>

        <Marker coordinate={{ latitude: 40.7382, longitude: -73.7849 }}>
          <View style={styles.dropMarker} />
        </Marker>

        <Polyline
          coordinates={[
            { latitude: 40.7282, longitude: -73.7949 },
            { latitude: 40.7382, longitude: -73.7849 },
          ]}
          strokeColor="#000"
          strokeWidth={3}
        />
      </MapView>

      {/* Header */}
      <View style={styles.header}>
        <Header image={Images.navBackbtn} title="Ride Option" color="#3E4958" type="back" />
        <View style={{ width: 24 }} /> 
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Car Options */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carList}
        >
          {cars.map((car) => (
            <TouchableOpacity
              key={car.id}
              style={[
                styles.carCard,
                selectedCar === car.name && styles.selectedCarCard,
              ]}
              onPress={() => setSelectedCar(car.name)}
            >
              <Image source={car.image} style={styles.carImage} resizeMode="contain" />
              <Text style={styles.carName}>{car.name}</Text>
              <Text style={styles.carPrice}>{car.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Payment */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentText}>
            {getSelectedPayment() ? `${getSelectedPayment().icon} **** ${getSelectedPayment().number}` : "💳 **** 8295"}
          </Text>
          <TouchableOpacity onPress={() => setShowPaymentModal(true)}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Coupon */}
        <View style={styles.couponSection}>
          <Text style={styles.couponText}>
            {selectedCoupon ? `Applied: ${selectedCoupon}` : "Apply Coupon Code"}
          </Text>
          <TouchableOpacity onPress={() => setShowCouponModal(true)}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.pickupNowBtn} onPress={handlePickUpBtn}>
            <Text style={styles.pickupNowText}>Pickup Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickupLaterBtn}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.pickupLaterText}>Pickup Later</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.calendarContainer}>
                <View style={styles.calendarHeader}>
                  <Text style={styles.calendarTitle}>Schedule Ride</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowCalendar(false)}
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>

                <Calendar
                  onDayPress={handleDateSelect}
                  monthFormat={'MMMM yyyy'}
                  hideArrows={false}
                  hideExtraDays={true}
                  firstDay={1}
                  enableSwipeMonths={true}
                  theme={{
                    selectedDayBackgroundColor: '#FF3B5C',
                    todayTextColor: '#FF3B5C',
                    arrowColor: '#FF3B5C',
                    monthTextColor: '#3E4958',
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Coupon Modal */}
      <Modal
        visible={showCouponModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowCouponModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCouponModal(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.couponModalContent}>
                <View style={styles.couponModalHeader}>
                  <Text style={styles.couponModalTitle}>Choose Coupon Code</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowCouponModal(false)}
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  style={styles.couponList}
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  {coupons.map((coupon) => (
                    <View key={coupon.id} style={styles.couponItem}>
                      <View style={styles.couponInfo}>
                        <Text style={styles.couponTitle}>{coupon.title}</Text>
                        <Text style={styles.couponDescription}>{coupon.description}</Text>
                        <Text style={styles.couponCode}>USECODE: {coupon.code}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.couponApplyButton}
                        onPress={() => handleCouponSelect(coupon)}
                      >
                        <Text style={styles.couponApplyText}>Apply</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Payment Method Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowPaymentModal(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.paymentModalContent}>
                <View style={styles.paymentModalHeader}>
                  <Text style={styles.paymentModalTitle}>Choose Payment Method</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowPaymentModal(false)}
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  style={styles.paymentList}
                  showsVerticalScrollIndicator={true}
                >
                  {paymentMethods.map((payment) => (
                    <TouchableOpacity
                      key={payment.id}
                      style={[
                        styles.paymentItem,
                        selectedPayment === payment.id && styles.selectedPaymentItem
                      ]}
                      onPress={() => handlePaymentSelect(payment)}
                    >
                      <View style={styles.paymentCardHeader}>
                        <Text style={styles.paymentCardIcon}>{payment.cardIcon}</Text>
                        <View style={styles.paymentCardInfo}>
                          <Text style={styles.paymentType}>{payment.type}</Text>
                          <Text style={styles.paymentNumber}>****  ****  ****  {payment.number}</Text>
                        </View>
                      </View>
                      <View style={[
                        styles.radioButton,
                        selectedPayment === payment.id && styles.radioButtonSelected
                      ]}>
                        {selectedPayment === payment.id && <View style={styles.radioButtonInner} />}
                      </View>
                    </TouchableOpacity>
                  ))}

                  <TouchableOpacity style={styles.addCardButton}>
                    <Text style={styles.addCardText}>+ Add Cards</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  pickupMarker: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "red",
    borderWidth: 3,
    borderColor: "#fff",
  },
  dropMarker: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "black",
    borderWidth: 3,
    borderColor: "#fff",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  carList: { paddingHorizontal: 16 },
  carCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginRight: 12,
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedCarCard: {
    borderWidth: 2,
    borderColor: "#FF3B5C"
  },
  carImage: {
    width: 70,
    height: 40,
    marginBottom: 8
  },
  carName: {
    fontSize: 14,
    fontWeight: "500"
  },
  carPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333"
  },
  paymentSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentText: { fontSize: 16, color: "#333" },
  changeText: { color: "#FF3B5C", fontWeight: "600" },
  couponSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  couponText: {
    fontSize: 16,
    color: "#666"
  },
  applyText: {
    color: "#FF3B5C",
    fontWeight: "600"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  pickupNowBtn: {
    flex: 1,
    backgroundColor: "#FF3B5C",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 8,
    height: 50,
    justifyContent: "center",
  },
  pickupNowText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16
  },
  pickupLaterBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginLeft: 8,
    height: 50,
    justifyContent: "center",
  },
  pickupLaterText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxWidth: 400,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3E4958"
  },

  couponModalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxWidth: 400,
    maxHeight: height * 0.35,
  },
  couponModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  couponModalTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  couponList: {
    flexGrow: 1
  },
  couponItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  couponInfo: {
    flex: 1,
    marginRight: 10
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4
  },
  couponDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4
  },
  couponCode: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF3B5C"
  },
  couponApplyButton: {
    backgroundColor: "#FF3B5C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  couponApplyText:
  {
    color: "white",
    fontWeight: "600",
    fontSize: 12
  },

  paymentModalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxWidth: 400,
    maxHeight: height * 0.5,
  },
  paymentModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  paymentModalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#343B71"
  },
  paymentList: { flexGrow: 1 },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedPaymentItem: {
    backgroundColor: "#f9f9f9",
  },
  paymentCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  paymentCardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentCardInfo: {
    flex: 1,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3E4958",
    marginBottom: 4
  },
  paymentNumber: {
    fontSize: 14,
    color: "#666",
    letterSpacing: 1,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#FF3B5C",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF3B5C",
  },
  addCardButton: {
    paddingVertical: 15,
    alignItems: "flex-start",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 10,
  },
  addCardText: {
    color: "#343B71",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default RideOption;