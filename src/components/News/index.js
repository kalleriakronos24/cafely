import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
const assets = '../../../assets/';

export class News extends Component {
	render () {
		let { width, height } = Dimensions.get('window');
		return (
			<View>
				<View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
					<Text style={{ fontSize: width < 410 ? 16 : 22, fontWeight: 'bold', paddingBottom: 6 }}>
						News
						<Text style={{ fontSize: width < 410 ? 11 : 12, fontWeight: 'normal' }}>Wed, 11 Mar 2020</Text>
					</Text>
					<View>
						<Image
							style={{ borderRadius: 4, alignSelf: 'stretch', width: '100%', flex: 1, height: 200 }}
							source={require(`${assets}/banner/q3.png`)}
						/>
					</View>
					<View
						style={{ marginTop: 6, paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }}
					>
						<Text style={{ fontWeight: 'bold', fontSize: width < 410 ? 17 : 22 }}>Destiny 2</Text>
						<Text style={{ fontSize: width < 410 ? 13 : 16, marginTop: 4, marginBottom: 11 }}>
							Warlock - Voidwalker qweqkwejadskjaksdjkadjaaksjdaksdjaksjdakdjasdaksdj
						</Text>
						<TouchableOpacity
							style={{
								backgroundColor   : '#2296F3',
								width             : '35%',
								height            : 32,
								borderRadius      : 4,
								paddingHorizontal : 12,
								paddingVertical   : 11,
								alignSelf         : 'flex-end',
								alignItems        : 'center',
								justifyContent    : 'center'
							}}
						>
							<Text style={{ fontSize: width < 410 ? 12 : 14, color: 'white' }}>READ MORE..</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
					<View>
						<Image
							style={{ borderRadius: 4, alignSelf: 'stretch', width: '100%', flex: 1, height: 200 }}
							source={require(`${assets}/banner/q3.png`)}
						/>
					</View>
					<View
						style={{ marginTop: 6, paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }}
					>
						<Text style={{ fontWeight: 'bold', fontSize: width < 410 ? 17 : 22 }}>Destiny 2</Text>
						<Text style={{ fontSize: width < 410 ? 13 : 16, marginTop: 4, marginBottom: 11 }}>
							Hunter - Gunslinger adkajsdkajdskqjwe
						</Text>
						<TouchableOpacity
							style={{
								backgroundColor   : '#2296F3',
								width             : '35%',
								height            : 32,
								borderRadius      : 4,
								paddingHorizontal : 12,
								paddingVertical   : 11,
								alignSelf         : 'flex-end',
								alignItems        : 'center',
								justifyContent    : 'center'
							}}
						>
							<Text style={{ fontSize: width < 410 ? 12 : 14, color: 'white' }}>READ MORE..</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
					<View>
						<Image
							style={{ borderRadius: 4, alignSelf: 'stretch', width: '100%', flex: 1, height: 200 }}
							source={require(`${assets}/banner/q3.png`)}
						/>
					</View>
					<View
						style={{ paddingTop: 6, paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }}
					>
						<Text style={{ fontWeight: 'bold', fontSize: width < 410 ? 17 : 22 }}>Destiny 2</Text>
						<Text style={{ fontSize: width < 410 ? 13 : 16, marginTop: 4, marginBottom: 11 }}>
							Hunter - Arcstrider adkajsdkajdskqjwe
						</Text>
						<TouchableOpacity
							style={{
								backgroundColor   : '#2296F3',
								width             : '35%',
								height            : 32,
								borderRadius      : 4,
								paddingHorizontal : 12,
								paddingVertical   : 11,
								alignSelf         : 'flex-end',
								alignItems        : 'center',
								justifyContent    : 'center'
							}}
						>
							<Text style={{ fontSize: width < 410 ? 12 : 14, color: 'white' }}>READ MORE..</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

export default News;
