import CardList from '../component/CardList';
import SearchBox from '../SearchBox';
import React from "react";
import './App.css';
import Scroll from '../component/Scroll';
import ErrorBoundary from "../component/ErrorBoundary";
class App extends React.Component {
	constructor() {
		super();
		this.state = {robots : [], searchfield: '',}
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json() )
			.then(users => this.setState({robots : users}));
			//.then(user => console.log(this.setState({robots : user})));
		}

	// My own built function should be like this
	onSearchChange = (event) =>{
		this.setState({searchfield: event.target.value} );
		//console.log(filterRobots);
	}
	render() {
		const filterRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield?.toLowerCase())
		});
		if(this.state.robots.length === 0){
			return <h1>Loading</h1>
		}
		else {
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundary>
							<CardList robots = {filterRobots} />
						</ErrorBoundary>
					</Scroll>
				</div>
			);
		}

	}
}

export default App;