import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  container2: {
    flexGrow: 1,
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    padding: 10,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    width: 60,
    backgroundColor: "#c7f0d0",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },
  card: {
    marginBottom: 15
  },
  deleteButton: {
    position: 'absolute',
    zIndex: 999,
    top: 5,
    right: 5,
    padding: 5
  },
  editButton: {
    position: 'absolute',
    zIndex: 999,
    bottom: 5,
    right: 5,
    padding: 5
  },
  secWrapper: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15
  },
  input: {
    height: 60,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 18
  },
  button: {
    marginTop: 10,
    paddingTop: 17,
    paddingBottom: 17,
    textAlign: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  userNameText: {
    marginLeft: 8,
    marginTop: 7,
    fontSize: 22,
    fontWeight: 'bold',
  },
  roleText: {
    fontSize: 16,
    marginTop: 1,
    marginLeft: 8
  },
  secText: {
    fontSize: 16,
    marginTop: 6,
    marginLeft: 5
  },
  secTextContanier: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5
  },
  verticalSpace: {
    width: 50,
    height: 100
  }
});
