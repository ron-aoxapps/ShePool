import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
} from "react-native";
import StarRating from 'react-native-star-rating-widget';
import Images from "../../constants/images";

const TripCompleted = () => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.feedbackCard}>
                    <View style={styles.header}>
                        <Image source={Images.completed} style={styles.completed}/>
                        <Text style={styles.headerTitle}>Your trip has been ended</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>$7.99</Text>
                    </View>
                    <View style={styles.starContainer}>
                        <StarRating
                            rating={rating}
                            onChange={setRating}
                            starSize={40}
                            color="#000000"
                            starStyle={styles.star}
                        />
                    </View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Feedback"
                        placeholderTextColor="#999"
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={feedback}
                        onChangeText={setFeedback}
                    />
                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TripCompleted;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    feedbackCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 30,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        alignItems: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#3E4958",
        textAlign: "center",
    },
    priceContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    price: {
        fontSize: 34,
        fontWeight: "700",
        color: "#3E4958",
    },
    starContainer: {
        marginBottom: 25,
    },
    star: {
        marginHorizontal: 6,
    },
    completed:{
       width:88,
       height:88,
       marginBottom:20
    },
    feedbackTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#3E4958",
        marginBottom: 15,
        textAlign: "center",
        width: "100%",
    },
    textInput: {
        backgroundColor: "#F8F9FA",
        borderRadius: 12,
        padding: 16,
        minHeight: 120,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        fontSize: 16,
        color: "#3E4958",
        textAlignVertical: "top",
        marginBottom: 25,
        width: "100%",
    },
    submitButton: {
        backgroundColor: "#FF597A",
        paddingVertical: 16,
        borderRadius: 25,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});