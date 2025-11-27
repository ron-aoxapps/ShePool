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

const couponsData = [
    {
        id: '1',
        title: 'Get 25% Off',
        description: 'Get 25% Off UPTO $10 on your first 2 maxi rides.',
        code: 'MAXI2500',
    },
    {
        id: '2',
        title: 'Get 20% Off',
        description: 'Get 20% Off on your next luxury ride.',
        code: 'LUXURY20',
    },
    {
        id: '3',
        title: 'Free Ride',
        description: 'Get a free ride on your first booking.',
        code: 'FREERIDE',
    },
];

const Coupons = () => {

    const renderCouponsItem = ({ item }) => (
        <View style={styles.couponContainer}>
            <View style={styles.couponHeader}>
                <Text style={styles.couponTitle}>{item.title}</Text>
            </View>
            
            <Text style={styles.couponDescription}>{item.description}</Text>
            
            <View style={styles.codeApplyContainer}>
                <View style={styles.codeContainer}>
                    <Text style={styles.codeText}>USE CODE: {item.code}</Text>
                </View>
                
                <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header image={Images.navBtn} title="Coupons" color="#3E4958" />
            <View style={styles.content}>
                <FlatList
                    data={couponsData}
                    renderItem={renderCouponsItem}
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
    couponContainer: {
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
    couponHeader: {
        marginBottom: 8,
    },
    couponTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3E4958',
    },
    couponDescription: {
        fontSize: 13,
        fontWeight:400,
        color: '#3E4958',
        lineHeight: 20,
    },
    codeApplyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    codeContainer: {
        flex: 1,
    },
    codeText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#3E4958',
    },
    applyButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyButtonText: {
        color: '#1A1A1A',
        fontSize: 20,
        fontWeight: '700',
    },
});

export default Coupons;