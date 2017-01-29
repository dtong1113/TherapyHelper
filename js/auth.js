var localToken = null;
var type, username;
export default {

	login (username, password) {

	},

	getToken () {
		return localToken;
	},

	setData (newType, newUsername) {
		type = newType;
		username = newUsername;
	},

	getType () {
		return type;
	},

	getUsername () {
		return username;
	},

	setToken (token) {
		localToken = token;
	},

	logout () {
		localToken = null;
	},

	loggedIn () {
		return localToken;
	}
}