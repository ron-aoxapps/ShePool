import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D5DDE0',
    borderRadius: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor:'#F7F8F9',
    width: '100%',
  },
  textinput: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    paddingVertical: 0,
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  seprator: {
    height: "50%",
    width: 1,
    backgroundColor: '#D5DDE0',
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 12,
    marginLeft: 10,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  addressItem: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        flexDirection: "row",

    },
  addressText: {
        flex: 1,
        padding: 5,
        // backgroundColor: Colors.gray + 30,
    }
});