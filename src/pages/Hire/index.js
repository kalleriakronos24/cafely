import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Picker, TextInput, ScrollView, Dimensions } from 'react-native';
import SearchPanel from '../../../src/components/Search/index';

export class Hire extends Component {
	constructor (props) {
		super(props);
		this.state = {
			val : 0
		};
	}
	render () {
		let { width, height } = Dimensions.get('window');
		return (
			<View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
				<View
					style={{
						marginHorizontal : 17,
						paddingTop       : 15,
						flexDirection    : 'row'
					}}
				>
					<TouchableOpacity
						onPress={() => this.props.navigation.goBack()}
						style={{ width: 40, alignItems: 'center', marginTop: 5, marginRight: 10 }}
					>
						<Image style={{ width: 30, height: 30 }} source={require('../../../assets/icon/arrow_l.png')} />
					</TouchableOpacity>

					<Text style={{ textAlign: 'center', fontSize: width < 410 ? 17 : 21, marginLeft: 10 }}>Hire-Me </Text>
					<Text />
				</View>
				<View style={{ padding: 16 }}>
					{width < 410 ? null : (
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<View
								style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
							>
								<Text style={{ fontSize: 17 }}>Filter By :</Text>
								<Picker
									selectedValue={this.state.val}
									style={{ height: 50, width: 100 }}
									onValueChange={(itemValue, itemIndex) => {
										this.setState({ val: itemValue });
										console.log(this.state.val);
									}}
								>
									<Picker.Item label='--' value='--' />
									<Picker.Item label='Tanggal' value='javas' />
									<Picker.Item label='JavaScript' value='Javascript' />
								</Picker>
								<Text style={{ fontSize: 17 }}>Sort By :</Text>
								<Picker
									selectedValue={this.state.val}
									style={{ height: 50, width: 100 }}
									onValueChange={(itemValue, itemIndex) => {
										this.setState({ val: itemValue });
										console.log(this.state.val);
									}}
								>
									<Picker.Item label='A~Z' value='A~Z' />
									<Picker.Item label='Z~A' value='Z~A' />
								</Picker>
								<TouchableOpacity
									style={{
										justifyContent  : 'center',
										alignItems      : 'center',
										backgroundColor : '#2296F3',
										width           : 65,
										height          : 37
									}}
								>
									<Text style={{ color: 'white' }}>FILTER</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}

					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={{ fontSize: 17 }}>SEARCH</Text>
						<TextInput
							style={{
								marginLeft  : 10,
								paddingLeft : 20,
								borderColor : 'black',
								borderWidth : 1,
								height      : 40,
								fontSize    : 14,
								marginRight : 18,
								width       : width - 100
							}}
							placeholder='Name, Expertise, Age . . .'
						/>
					</View>
					<View style={{ paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
				</View>
				<ScrollView style={{ padding: 16 }}>
					<View
						style={{
							borderWidth   : 1,
							borderColor   : 'black',
							height        : 120,
							flexDirection : 'row',
							marginBottom  : 10
						}}
					>
						<View style={{ padding: 4 }}>
							<Image
								style={{ height: 110, width: 110 }}
								source={require('../../../assets/person/sponjibob.png')}
							/>
						</View>
						<View style={{ marginLeft: 20, marginTop: 10, width: 240 }}>
							<Text style={{ fontSize: 17, fontWeight: 'bold' }}>Mada Nugraha</Text>
							<Text>Age : 19</Text>
							<Text>Expertise : Programming</Text>
							<View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 4 }}>
								<Text />
								{width < 410 ? null : (
									<TouchableOpacity
										style={{
											padding         : 10,
											backgroundColor : '#2296F3',
											justifyContent  : 'center',
											alignItems      : 'center',
											width           : 100
										}}
									>
										<Text style={{ color: 'white', textAlign: 'center', fontSize: 17 }}>View</Text>
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
					<View
						style={{
							borderWidth   : 1,
							borderColor   : 'black',
							height        : 120,
							flexDirection : 'row',
							marginBottom  : 10
						}}
					>
						<View style={{ padding: 4 }}>
							<Image
								style={{ height: 110, width: 110 }}
								source={require('../../../assets/person/sponjibob.png')}
							/>
						</View>
						<View style={{ marginLeft: 20, marginTop: 10, width: 240 }}>
							<Text style={{ fontSize: 17, fontWeight: 'bold' }}>Mada Nugraha</Text>
							<Text>Age : 19</Text>
							<Text>Expertise : Programming</Text>
							<View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 4 }}>
								<Text />
								{width < 410 ? null : (
									<TouchableOpacity
										style={{
											padding         : 10,
											backgroundColor : '#2296F3',
											justifyContent  : 'center',
											alignItems      : 'center',
											width           : 100
										}}
									>
										<Text style={{ color: 'white', textAlign: 'center', fontSize: 17 }}>View</Text>
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
					<View
						style={{
							borderWidth   : 1,
							borderColor   : 'black',
							height        : 120,
							flexDirection : 'row',
							marginBottom  : 10
						}}
					>
						<View style={{ padding: 4 }}>
							<Image
								style={{ height: 110, width: 110 }}
								source={require('../../../assets/person/sponjibob.png')}
							/>
						</View>
						<View style={{ marginLeft: 20, marginTop: 10, width: 240 }}>
							<Text style={{ fontSize: 17, fontWeight: 'bold' }}>Mada Nugraha</Text>
							<Text>Age : 19</Text>
							<Text>Expertise : Programming</Text>
							<View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 4 }}>
								<Text />
								{width < 410 ? null : (
									<TouchableOpacity
										style={{
											padding         : 10,
											backgroundColor : '#2296F3',
											justifyContent  : 'center',
											alignItems      : 'center',
											width           : 100
										}}
									>
										<Text style={{ color: 'white', textAlign: 'center', fontSize: 17 }}>View</Text>
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
					<View
						style={{
							borderWidth   : 1,
							borderColor   : 'black',
							height        : 120,
							flexDirection : 'row',
							marginBottom  : 10
						}}
					>
						<View style={{ padding: 4 }}>
							<Image
								style={{ height: 110, width: 110 }}
								source={require('../../../assets/person/sponjibob.png')}
							/>
						</View>
						<View style={{ marginLeft: 20, marginTop: 10, width: 240 }}>
							<Text style={{ fontSize: 17, fontWeight: 'bold' }}>Mada Nugraha</Text>
							<Text>Age : 19</Text>
							<Text>Expertise : Programming</Text>
							<View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 4 }}>
								<Text />
								{width < 410 ? null : (
									<TouchableOpacity
										style={{
											padding         : 10,
											backgroundColor : '#2296F3',
											justifyContent  : 'center',
											alignItems      : 'center',
											width           : 100
										}}
									>
										<Text style={{ color: 'white', textAlign: 'center', fontSize: 17 }}>View</Text>
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default Hire;
