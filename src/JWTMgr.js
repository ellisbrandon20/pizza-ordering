// in-memory solution for storing and retrieving JWT Token
const JWTMgr = () => {
	let JWTauth = null;

	const getToken = () => JWTauth;

	const setToken = (token) => {
		JWTauth = token;
		return true;
	}

	const clearToken = () => {
		JWTauth = null;
		return true;
	}

	return {
		getToken,
		setToken,
		clearToken
	};
};

export default JWTMgr();