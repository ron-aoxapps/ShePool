import React, { useState } from "react";
import { 
  Image, 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  FlatList 
} from "react-native";
import Images from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/header";

// Sample transaction data
const transactionData = [
  {
    id: '1',
    type: 'Luxury Ride',
    date: '17 Aug 2021 at 10:40',
    amount: '$22.45',
  },
  {
    id: '2',
    type: 'Standard Ride',
    date: '15 Aug 2021 at 10:40',
    amount: '$8.49',
  },
  {
    id: '3',
    type: 'Standard Ride',
    date: '10 Aug 2021 at 14:30',
    amount: '$7.99',
  },
  {
    id: '4',
    type: 'Luxury Ride',
    date: '2 Aug 2021 at 17:52',
    amount: '$17.99',
  },
  {
    id: '5',
    type: 'Luxury Ride',
    date: '27 Jul 2021 at 14:30',
    amount: '$12.50',
  },
  {
    id: '6',
    type: 'Luxury Ride',
    date: '22 Jul 2021 at 14:30',
    amount: '$17.99',
  },
];

const Transactions = () => {
  const navigation = useNavigation();

  // Render each transaction item
  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIconContainer}>
        <Image 
          source={Images.minusCircleOutlined} 
          style={styles.transactionIcon}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      
      <View style={styles.transactionAmountContainer}>
        <Text style={styles.transactionAmount}>{item.amount}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header image={Images.navBtn} title="Transactions" color="#3E4958"/>
      
      <View style={styles.content}>
        <FlatList
          data={transactionData}
          renderItem={renderTransactionItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
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
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20, // Added horizontal padding for equal spacing from left
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F8F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionIcon: {
    width: 24,
    height: 24,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2F2C2C',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 16,
    fontWeight: 400,
    color: '#827C7C',
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#D1D1D1',
  },
});

export default Transactions;