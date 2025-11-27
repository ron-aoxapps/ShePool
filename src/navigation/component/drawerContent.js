import React from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Images from '../../constants/images';

const menuItems = [
    {
        name: 'TRIP HISTORY',
        icon: Images.pathIcon,
        screen: 'TripHistory', 
    },
    {
        name: 'COUPONS',
        icon: Images.couponsIcon,
        screen: 'Coupons', 
    },
    {
        name: 'PAYMENT METHOD',
        icon: Images.cardIcon,
        screen: 'PaymentMethod', 
    },
    {
        name: 'TRANSACTIONS',
        icon: Images.transactionsIcon,
        screen: 'Transactions', 
    },
    {
        name: 'EDIT PROFILE',
        icon: Images.avatarDrawerIcon,
        screen: 'EditProfile', 
    },
    {
        name: 'ABOUT US',
        icon: Images.aboutUsMenu,
        screen: 'AboutUs', 
    },
    {
        name: 'EMERGENCY',
        icon: Images.phoneIcon,
        screen: 'Emergency', 
    },
    {
        name: 'LOG OUT',
        icon: Images.logout,
        screen: 'Logout', 
    },
];

const DrawerContent = (props) => {
    console.log(props)
    const navigation = useNavigation();
    
    const handleLogout = () => {
        navigation.navigate('Login')
    };
    
    const handleNavigation = (screenName) => {
        props.navigation.closeDrawer();
        if (screenName === 'Logout') {
            handleLogout();
        } else {
             navigation.navigate('Main', { screen: screenName });
        }
    };
    
    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => handleNavigation(item.screen)}
            >
                <Image source={item.icon} style={styles.menuIcon} />
                <Text style={styles.menuItemText}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <ImageBackground source={Images.drawerHeaderbg} style={styles.drawerHeaderbg}>
                    <View style={styles.drawerHeader}>
                        <Image source={Images.profilePlaceholder} style={styles.profileImage}/>
                        <Text style={styles.userName}>Jene Iolese</Text>
                        <Text style={styles.phoneNumber}>+1 234 5678 90</Text>
                    </View>
                </ImageBackground>

                <FlatList
                    data={menuItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                    style={styles.list}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        width: '100%',
        flex: 1,
    },
    drawerHeaderbg: {
        height: 209,
        width: '100%',
        justifyContent: 'center',
    },
    drawerHeader: {
        padding: 25,
        alignItems: 'flex-start',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#fff',
        marginBottom: 15,
        marginTop: 20,
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5,
        color: '#1A1A1A',
    },
    phoneNumber: {
        fontSize: 15,
        fontWeight: "500",
        color: '#1A1A1A',
        opacity: 0.8,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 18,
        width: '100%',
        alignItems: 'center',
        paddingLeft: 25,
    },
    menuIcon: {
        width: 22,
        height: 22,
        marginRight: 15,
        tintColor: '#3E4957',
    },
    menuItemText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#3E4957',
        textTransform: 'uppercase',
    },
    list: {
        width: '100%',
        marginTop: 10,
    },
});

export default DrawerContent;