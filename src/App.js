import { Component } from 'react';
import { Login } from './components/Login';
import { NewOrder } from './components/NewOrder';
import { SuccessfulOrder } from './components/SuccessfulOrder';
import { Dashboard } from './components/Dashboard/Dashboard';
import './App.css';
import { Text } from 'atomize';
import { Error } from './components/Error';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentScreen: 'Login'
		};
	}

	goToScreen = (screen) => {
		this.setState({
			'currentScreen': screen
		});
	}

	render() {
		const { currentScreen } = this.state;
		return (
			<div className="App">
				<div className="background-opacity">

					<Text
						tag="h1"
						textSize="display3"
						m={{ b: '2rem' }}
						transform='translateY(5rem)'
					>
						Jimmy's Pizzeria
					</Text>

					{/* Login Page  */}
					{currentScreen === 'Login' &&
						<Login goToScreen={this.goToScreen} />
					}

					{/* Home Page (Create Order / View Orders) */}
					{currentScreen === 'Dashboard' &&
						<Dashboard goToScreen={this.goToScreen} />
					}

					{/* Create New Order Screen */}
					{currentScreen === 'NewOrder' &&
						<NewOrder goToScreen={this.goToScreen} />
					}

					{/* Submission successful */}
					{currentScreen === 'SuccessfulOrder' &&
						<SuccessfulOrder goToScreen={this.goToScreen} />
					}

					{/* Standard Error page */}
					{currentScreen === 'Error' &&
						<Error />
					}
				</div>
			</div>

		);
	}
}

export default App;
