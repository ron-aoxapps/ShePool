import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from "react-native";
import Images from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/header";

// Sample payment method data
const paymentMethodsData = [
    {
        id: '1',
        type: 'Master Card',
        cardNumber: '********** 4594',
        icon: Images.mastercard,
        cardType: 'Master Card'
    },
    {
        id: '2',
        type: 'VISA',
        cardNumber: '********** 1617',
        icon: Images.visa,
        cardType: 'Visa Card'
    },
];

const PaymentMethod = () => {
    const navigation = useNavigation();

    // Render each payment method item as a card
    const renderPaymentMethodItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <View style={styles.paymentItem}>
                <View style={styles.paymentIconContainer}>
                    <Image
                        source={item.icon}
                        style={styles.paymentIcon}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.paymentDetails}>
                    <Text style={styles.paymentType}>{item.cardType || item.type}</Text>
                    <Text style={styles.cardNumber}>{item.cardNumber}</Text>
                </View>

                <TouchableOpacity style={styles.deleteButton}>
                    <Image
                        source={Images.delete}
                        style={styles.deleteIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    // Render add new card button


    return (
        <SafeAreaView style={styles.container}>
            <Header image={Images.navBtn} title="Payment Method" color="#3E4958" />

            <View style={styles.content}>
                <FlatList
                    data={paymentMethodsData}
                    renderItem={renderPaymentMethodItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />
            </View>
            <View style={styles.addButtonContainer}>
            <TouchableOpacity style={styles.addButton} >
                <Text style={styles.addButtonText}>Add New Card</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
    listContent: {
        padding: 20,
        paddingBottom: 10,
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    paymentItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIconContainer: {
        width: 50,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        backgroundColor: '#F7F8F9',
        borderRadius: 6,
    },
    paymentIcon: {
        width: 40,
        height: 24,
    },
    paymentDetails: {
        flex: 1,
    },
    paymentType: {
        fontSize: 17,
        fontWeight: '500',
        color: '#343B71',
        marginBottom: 4,
    },
    cardNumber: {
        fontSize: 14,
        fontWeight: '500',
        color: '#A1A6CA',
        letterSpacing: 0.5,
    },
    deleteButton: {
        padding: 8,
    },
    deleteIcon: {
        width: 20,
        height: 20,
        tintColor: 'black',
    },
    addButtonContainer:{
     paddingLeft:20,
     paddingRight:20,
     paddingTop:20
    },
    addButton: {
        backgroundColor: '#FF597A',
        width: '100%',
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default PaymentMethod;