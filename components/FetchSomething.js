import React from 'react';
import {Button } from 'react-native';

const fetchSomething = props => {
	return  (
		<Button title="Get Something" onPress = {props.onGetSomething}  />
	);
};

export default fetchSomething;