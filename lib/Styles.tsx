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
    paddingHorizontal: 20
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
    padding: 5,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    width: 50,
    backgroundColor: "#c7f0d0"
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },
  successMsg: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green",
    marginTop: 10
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
    backgroundColor: 'white'
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15
  },
  input: {
    height: 60,
    marginBottom: 15,
    fontSize: 18
  },
  buttonSave: {
    height: 50,
    width: "100%",
    backgroundColor: '#2a41cb',
    marginTop: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: '#2a41cb',
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  buttonClear: {
    height: 50,
    width: "100%",
    backgroundColor: 'red',
    marginTop: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  userNameText: {
    marginLeft: 8,
    marginTop: 7,
    fontSize: 22,
    fontWeight: 'bold'
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
    height: 170
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: -7,
    marginRight: 5
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarInitials: {
    fontSize: 24,
    color: '#fff'
  },
});
