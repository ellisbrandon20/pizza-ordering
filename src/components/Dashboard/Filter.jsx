import { Anchor, Button, Container, Div, Dropdown, Input } from "atomize";
import { Component } from "react";

const CrustDropdownList = ({ updateFilter, updateShowDropDown, showCrustDropdown }) => (
	<Div>
		{['Original', 'Thin', 'Stuffed', 'Deepdish', 'Clear'].map((name, i) => (
			<Anchor
				key={`crust-dropdown-${i}`}
				d='block'
				p={{ y: '0.25rem' }}
				onClick={() => {
					updateFilter('filCrust', name === 'Clear' ? undefined : name);
					updateShowDropDown('showCrustDropdown', !showCrustDropdown);
				}}
			>
				{name}
			</Anchor>
		))}
	</Div>
);

const FlavorDropdownList = ({ updateFilter, updateShowDropDown, showFlavorDropdown }) => (
	<Div>
		{['Cheese', 'Pepperoni', 'Sausage', 'Supreme', 'Clear'].map((name, i) => (
			<Anchor
				key={`flavor-dropdown-${i}`}
				d='block'
				p={{ y: '0.25rem' }}
				onClick={() => {
					updateFilter('filFlavor', name === 'Clear' ? undefined : name);
					updateShowDropDown('showFlavorDropdown', !showFlavorDropdown);
				}}
			>
				{name}
			</Anchor>
		))}
	</Div>
);

const SizeDropdownList = ({ updateFilter, updateShowDropDown, showSizeDropdown }) => (
	<Div>
		{[
			{ label: 'Small (12")', value: 'S' },
			{ label: 'Medium (16")', value: 'M' },
			{ label: 'Large (18")', value: 'L' },
			{ label: 'Clear', value: undefined },
		].map((name, i) => (
			<Anchor
				key={`size-dropdown-${i}`}
				d='block'
				p={{ y: '0.25rem' }}
				onClick={() => {
					updateFilter('filSize', name.value);
					updateShowDropDown('showSizeDropdown', !showSizeDropdown);
				}}
			>
				{name.label}
			</Anchor>
		))}
	</Div>
);

export class Filter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			'showCrustDropdown': false,
			'showFlavorDropdown': false,
			'showSizeDropdown': false,
		};
	}

	updateShowDropDown = (filDropdown, value) => {
		this.setState({ [filDropdown]: value });
	};

	clearAllFilters = () => {
		this.props.updateFilter('filCrust', undefined);
		this.props.updateFilter('filFlavor', undefined);
		this.props.updateFilter('filSize', undefined);
		this.props.updateFilter('filTableNo', NaN);
		document.querySelector('input').value = undefined;
	}

	render() {
		const { showCrustDropdown, showFlavorDropdown, showSizeDropdown } = this.state;
		const { filCrust, filFlavor, filSize } = this.props;

		return (
			<Container
				w="50rem"
				m={{ l: 'auto', r: 'auto', t: '1.25rem' }}
			>
				<Div d='flex'>
					<Dropdown
						isOpen={showCrustDropdown}
						onClick={() => this.updateShowDropDown('showCrustDropdown', !showCrustDropdown)}
						menu={<CrustDropdownList updateFilter={this.props.updateFilter} updateShowDropDown={this.updateShowDropDown} showCrustDropdown={showCrustDropdown} />}
						w='8rem'
						m={{ l: '0.5rem', r: '0.5rem' }}
						borderColor="danger500"
						focusBorderColor="danger700"
						hoverBorderColor="danger700"
					>
						{filCrust === undefined ? 'Crust' : filCrust}
					</Dropdown>
					<Dropdown
						isOpen={showFlavorDropdown}
						onClick={() => this.updateShowDropDown('showFlavorDropdown', !showFlavorDropdown)}
						menu={<FlavorDropdownList updateFilter={this.props.updateFilter} updateShowDropDown={this.updateShowDropDown} showFlavorDropdown={showFlavorDropdown} />}
						w='8rem'
						m={{ l: '0.5rem', r: '0.5rem' }}
						borderColor="danger500"
						focusBorderColor="danger700"
						hoverBorderColor="danger700"
					>
						{filFlavor === undefined ? 'Flavor' : filFlavor}

					</Dropdown>
					<Dropdown
						isOpen={showSizeDropdown}
						onClick={() => this.updateShowDropDown('showSizeDropdown', !showSizeDropdown)}
						menu={<SizeDropdownList updateFilter={this.props.updateFilter} updateShowDropDown={this.updateShowDropDown} showSizeDropdown={showSizeDropdown} />}
						w='8rem'
						m={{ l: '0.5rem', r: '0.5rem' }}
						borderColor="danger500"
						focusBorderColor="danger700"
						hoverBorderColor="danger700"
					>
						{filSize === undefined ? 'Size' : filSize}
					</Dropdown>
					<Input
						placeholder="Table #"
						name='tableNo'
						type='number'
						w='5.75rem'
						m={{ l: '0.5rem', r: '0.5rem' }}
						borderColor="danger500"
						focusBorderColor="danger700"
						hoverBorderColor="danger700"
						onChange={(e) => this.props.updateFilter('filTableNo', parseInt(e.target.value))}
					/>

					<Button
						rounded="lg"
						left='5rem'
						bg="danger700"
						hoverBg="danger600"
						onClick={() => this.clearAllFilters()}
					>
						Clear All
					</Button>
				</Div>
			</Container >
		);
	}
}