import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Dimensions
} from 'react-native';
import Images from '../../constants/images';
import Header from '../../components/header'

const { width, height } = Dimensions.get('window');

const AboutUs = () => {

    return (
        <View style={styles.container}>
            <ImageBackground
                source={Images.aboutUs}
                style={styles.backgroundImage}
            >
                <View style={styles.overlay} />
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Header image={Images.navBtn} title="About Us" color="#ffffff"/>
                    <View style={styles.content}>
                        <Text style={styles.appTitle}>Rider Taxi Application</Text>
                        <View style={styles.divider} />
                        <Text style={styles.infoTitle}>Version 1.1.1</Text>
                        <View style={styles.divider} />
                        <Text style={styles.infoTitle}>Contact Information</Text>
                        <View style={styles.divider} />
                        <Text style={styles.infoTitle}>Legal Notices</Text>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(40, 55, 70, 0.4)',
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: 60,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom:30
    },
    appTitle: {
        fontWeight: '700',
        fontSize: 20,
        letterSpacing: 0.2,
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom:20
    },
    divider: {
        height: 1,
        width: 414,
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start',
        marginVertical: 10,
    },
    infoTitle:{
       fontWeight: '700',
        fontSize: 20,
        letterSpacing: 0.2,
        color: "#FFFFFF",
        textAlign: "left",
        margin:20
    }
});

export default AboutUs;