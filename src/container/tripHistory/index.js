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
import Header from "../../components/header";

const tripHistoryData = [
    {
        id: '1',
        date: '12 Aug 2021, 18:39',
        distance: '3 Miles',
        pickup: '1, Thrale Street, London, SE19HW, UK',
        dropoff: 'Ealing Broadway Shopping Centre, London, W55JY, UK',
        price: '$7.99',
        status: 'COMPLETED'
    },
    {
        id: '2',
        date: '10 Aug 2021, 10:15',
        distance: '3 Miles',
        pickup: '1, Thrale Street, London, SE19HW, UK',
        dropoff: 'Ealing Broadway Shopping Centre, London, W55JY, UK',
        price: '$6.99',
        status: 'CANCELLED'
    },
];

const TripHistory = () => {

    const renderTripHistoryItem = ({ item }) => (
        <View style={styles.tripContainer}>
            <View style={styles.tripHeader}>
                <View style={styles.dateContainer}>
                    <Image source={Images.clockIcon} style={styles.icon} />
                    <Text style={styles.tripDate}>{item.date}</Text>
                </View>
                <View style={styles.distanceContainer}>
                    <Image source={Images.roadIcon} style={styles.icon} />
                    <Text style={styles.tripDistance}>{item.distance}</Text>
                </View>
            </View>
            
            <View style={styles.locationContainer}>
                <View style={[styles.locationDot, styles.pickupDot]} />
                <View style={styles.locationDetails}>
                    <Text style={styles.locationText}>{item.pickup}</Text>
                </View>
            </View>
            <View style={styles.connectingLine} />
            <View style={styles.locationContainer}>
                <Image source={Images.triangleIcon} style={styles.triangleIcon} />
                <View style={styles.locationDetails}>
                    <Text style={styles.locationText}>{item.dropoff}</Text>
                </View>
            </View>
            <View style={styles.tripFooter}>
                <Text style={styles.tripPrice}>{item.price}</Text>
                <View style={[
                    item.status === 'COMPLETED' ? styles.completedBadge : styles.cancelledBadge
                ]}>
                    <Text style={[
                        styles.statusText,
                        item.status === 'COMPLETED' ? styles.completedText : styles.cancelledText
                    ]}>
                        {item.status}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header image={Images.navBtn} title="Trip History" color="#3E4958" />
            <View style={styles.content}>
                <FlatList
                    data={tripHistoryData}
                    renderItem={renderTripHistoryItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F9',
    },
    content: {
        flex: 1,
    },
    listContent: {
        padding: 16,
        paddingBottom: 20,
    },
    tripContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        padding: 20,
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
    tripHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth:1,
        borderColor: '#D5DDE0',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 8,
        resizeMode: 'contain',
    },
    tripDate: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    tripDistance: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    locationDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
        marginTop: 4,
    },
    pickupDot: {
        backgroundColor: '#185A7D',
    },
    triangleIcon: {
        width: 12,
        height: 12,
        marginRight: 12,
        marginTop: 4,
        resizeMode: 'contain',
    },
    locationDetails: {
        flex: 1,
    },
    locationText: {
        fontSize: 15,
        fontWeight: 400,
        color: '#3E4958',
        lineHeight: 20,
    },
    connectingLine: {
        width: 2,
        height: 20,
        backgroundColor: '#3E4958',
        marginLeft: 5,
        marginBottom: 8,
    },
    tripFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    tripPrice: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '700',
    },
    completedText: {
        color: '#000000',
    },
    cancelledText: {
        color: '#F22A2A',
    },
});

export default TripHistory;