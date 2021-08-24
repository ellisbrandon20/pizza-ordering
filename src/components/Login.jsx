import { Button, Container, Icon, Input, Text } from "atomize";
import { Component } from "react";
import { getLoginToken } from "../apis";
import JWTMgr from "../JWTMgr";

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const { username, password } = this.state;
		getLoginToken(username, password)
			.then(responseData => {
				JWTMgr.setToken(responseData.access_token);
				this.props.goToScreen('Dashboard');
			}).catch(_ => {
				this.props.goToScreen('Error');
			});
	}

	handleChange = (input, e) => {
		this.setState({ [input]: e.target.value });
	}

	render() {
		return (
			<>
				<Container
					w="50rem"
					h="auto"
					m={{ l: 'auto', r: 'auto' }}
					p={{ t: '2rem', b: '2rem' }}
					transform='translateY(5rem)'
					rounded="lg"
					className="transparent-container"
				>
					<Text tag="h2" textSize="display1">Login</Text>
					<form onSubmit={this.handleSubmit}>
						<Input
							placeholder="Username"
							value={this.state.username}
							onChange={(e) => this.handleChange('username', e)}
							required
							w="18rem"
							p={{ x: "2.5rem" }}
							m={{ l: 'auto', r: 'auto', t: '0.5rem' }}
							d="block"
							borderColor="danger500"
							focusBorderColor="danger700"
							hoverBorderColor="danger700"
							prefix={
								<Icon
									name="UserSolid"
									color="danger700"
									cursor="pointer"
									pos="relative"
									transform="translate(140%, 15%)"
								/>
							}
						/>
						<Input
							placeholder="Password"
							type="password"
							value={this.state.password}
							onChange={(e) => this.handleChange('password', e)}
							required
							w="18rem"
							p={{ x: "2.5rem" }}
							m={{ l: 'auto', r: 'auto', t: '0.5rem' }}
							d="block"
							borderColor="danger500"
							focusBorderColor="danger700"
							hoverBorderColor="danger700"
							prefix={
								<Icon
									name="LockSolid"
									color="danger700"
									cursor="pointer"
									pos="relative"
									transform="translate(140%, 15%)"
								/>
							}
						/>
						<Button
							type="submit"
							rounded="circle"
							bg="danger700"
							hoverBg="danger600"
							m={{ l: 'auto', r: 'auto', t: '1.25rem' }}
							shadow="2"
							hoverShadow="4"
						>
							Login
						</Button>
					</form>
				</Container>
			</>
		);
	}
}