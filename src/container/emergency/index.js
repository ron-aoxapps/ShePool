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

const Emergency = () => {
    const [contacts, setContacts] = useState([
        // {
        //     id: '1',
        //     name: 'Darlene Rob',
        //     phone: '(229) 555-0109'
        // },
        // {
        //     id: '2',
        //     name: 'Ronald Richards',
        //     phone: '(480) 555-0103'
        // }
    ]);

    const renderContactItem = ({ item }) => (
        <View style={styles.contactItem}>
            <View style={styles.contactIconContainer}>
                <Text style={styles.contactIconText}>
                    {item.name.charAt(0)}
                </Text>
            </View>
            <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Emergency Contact</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header image={Images.navBtn} title="Emergency" color="#3E4958" />
            <View style={styles.content}>
                {contacts.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <FlatList
                        data={contacts}
                        renderItem={renderContactItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                    />
                )}

                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>
                        {contacts.length === 0 ? 'Add Contacts' : 'Change Contacts'}
                    </Text>
                </TouchableOpacity>
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
        padding: 16,
        justifyContent: 'space-between',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: '',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#1A1A1A',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    contactIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contactIconText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    contactPhone: {
        fontSize: 14,
        color: '#8E8E93',
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
    },
});

export default Emergency;