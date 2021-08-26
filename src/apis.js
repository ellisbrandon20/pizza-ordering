import JWTMgr from "./JWTMgr";

// ? - where to store token
//! - cross-site scripting (xss) - local storage
//! - cross-site request forgery (CSRF) - cookie storage
//! - in-memory: downside on refresh user has to login
export async function getLoginToken(username, password) {
	const user = { username, password };

	return await fetch('/api/auth', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'content-type': 'application/json',
		}
	}).then((response) => {
		if (!response.ok) throw Error('error login');

		return response.json();
	});
}

export async function getPizza() {
	return await fetch('/api/orders')
		.then((response) => {
			if (!response.ok) throw Error('error loading pizzas');

			return response.json();
		});
}

export async function createOrder(order) {
	return await fetch('/api/orders', {
		method: 'POST',
		body: JSON.stringify(order),
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${JWTMgr.getToken()}`,
		}
	}).then((response) => {
		if (!response.ok) throw Error('error create order');

		return response.json();
	});
}

export async function deleteOrder(id) {
	return await fetch('/api/orders/' + id, {
		method: 'DELETE'
	}).then((response) => {
		if (!response.ok) throw Error('error delete order');

		return response.json();
	});
}