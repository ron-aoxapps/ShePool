import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, image, color, type }) => {
    const navigation = useNavigation();
    console.log(image, 'image')
    const handleDrawerOpen = () => {
        try {
            console.log(navigation.openDrawer)
            if (navigation.openDrawer && type != "back") {
                navigation.openDrawer();
            } else {
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error opening drawer:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {type != "back" ? 
                <TouchableOpacity onPress={handleDrawerOpen}>
                    <Image source={image} style={styles.image} />
                </TouchableOpacity> : 
                <TouchableOpacity onPress={handleDrawerOpen}>
                    <Image source={image} style={styles.image} />
                </TouchableOpacity>
                }
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: color }]}>{title}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        paddingHorizontal: 15,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:99999
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default Header;