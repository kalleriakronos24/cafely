import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import Animated from 'react-native-reanimated';

export const Inbox = (props) => {

	const gs = useSelector((state) => state.CART_ITEMS);
	let [
		index,
		setIndex
	] = useState(0);
	let [
		routes
	] = useState([
		{
			key: 'first',
			title: 'Notifications'
		},
		{
			key: 'second',
			title: 'Message'
		},
		{
			key: 'third',
			title: 'Mod Mail'
		}
	]);
	let [
		notif,
		setNotif
	] = useState([
		{
			id: 1,
			from: 'Cafely',
			msg: 'Cafely Release!',
			time_received: '10:10 AM',
			date_received: '24 April 2020'
		}
	]);
	const width = Dimensions.get('window').width;
	let [
		isHide,
		setHide
	] = useState(false);
	const dispatch = useDispatch();
	const initLayout = { width: width };
	let hideModal = () => {
		dispatch({ type: 'modal_new_mail', status: false });
	};
	let [
		animate,
		setScrollY
	] = useState(new Animated.Value(0));

	const mail_transition = animate.interpolate({
		inputRange: [
			0,
			1,
			2,
			4,
			6
		],
		outputRange: [
			4,
			6,
			2,
			1,
			0
		],
		extrapolate: 'clamp'
	});
	const firstRoute = () => {
		return (
			<View style={{ padding: 16 }}>
				<Spinner isVisible={true} size={40} type='ThreeBounce' color='black' />
				<View style={{ paddingTop: 16, paddingBottom: 16 }}>
					<TouchableOpacity onPress={() => console.log(gs)}>
						<Text style={{ fontSize: 22 }}>Fri, 10 Apr 2020</Text>
					</TouchableOpacity>
				</View>
				<View style={{ flex: 1, paddingLeft: 8 }}>
					<Text>New Message - ( 1 )</Text>
					<View style={{ borderWidth: 1, width: '100%', borderColor: 'red' }} />

					<View style={{ marginTop: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
							<View style={{ borderWidth: 1, height: 72, width: 72, borderColor: 'black' }}>
								<Image
									style={{ resizeMode: 'cover', height: 72, width: 72 }}
									source={require('../../../assets/person/sponjibob.png')}
								/>
							</View>
							<View style={{ paddingLeft: 9, flex: 1 }}>
								<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Welcome to Cafely !</Text>
								<Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingTop: 2 }}>
									qwekqjwekjkqwjekqwjkqwjekqjwqjwekqjwejwekqwej
								</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'flex-start',
										paddingTop: 15
									}}
								>
									<Text style={{ fontSize: 13 }}>1:10 AM</Text>
									<Text style={{ fontSize: 13, marginLeft: 10 }}>1:10 AM</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	};
	const secondRoute = () => {
		return (
			<View style={{ padding: 16 }}>
				<View style={{ paddingTop: 16, paddingBottom: 16 }}>
					<Text style={{ fontSize: 22 }}>Fri, 10 Apr 2020</Text>
				</View>
				<View style={{ flex: 1, paddingLeft: 8 }}>
					<Text>New Message - ( 1 )</Text>
					<View style={{ borderWidth: 1, width: '100%', borderColor: 'red' }} />

					<View style={{ marginTop: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
							<View style={{ borderWidth: 1, height: 72, width: 72, borderColor: 'black' }}>
								<Image
									style={{ resizeMode: 'cover', height: 72, width: 72 }}
									source={require('../../../assets/person/sponjibob.png')}
								/>
							</View>
							<View style={{ paddingLeft: 9, flex: 1 }}>
								<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Welcome to Cafely !</Text>
								<Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingTop: 2 }}>
									qwekqjwekjkqwjekqwjkqwjekqjwqjwekqjwejwekqwej
								</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'flex-start',
										paddingTop: 15
									}}
								>
									<Text style={{ fontSize: 13 }}>1:10 AM</Text>
									<Text style={{ fontSize: 13, marginLeft: 10 }}>1:10 AM</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	};
	const thirdRoute = () => {
		return (
			<View style={{ padding: 16 }}>
				<View style={{ paddingTop: 16, paddingBottom: 16 }}>
					<Text style={{ fontSize: 22 }}>Fri, 10 Apr 2020</Text>
				</View>
				<View style={{ flex: 1, paddingLeft: 8 }}>
					<Text>New Message - ( 1 )</Text>
					<View style={{ borderWidth: 1, width: '100%', borderColor: 'red' }} />

					<View style={{ marginTop: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
							<View style={{ borderWidth: 1, height: 72, width: 72, borderColor: 'black' }}>
								<Image
									style={{ resizeMode: 'cover', height: 72, width: 72 }}
									source={require('../../../assets/person/sponjibob.png')}
								/>
							</View>
							<View style={{ paddingLeft: 9, flex: 1 }}>
								<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Welcome to Cafely !</Text>
								<Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingTop: 2 }}>
									qwekqjwekjkqwjekqwjkqwjekqjwqjwekqjwejwekqwej
								</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'flex-start',
										paddingTop: 15
									}}
								>
									<Text style={{ fontSize: 13 }}>1:10 AM</Text>
									<Text style={{ fontSize: 13, marginLeft: 10 }}>1:10 AM</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	};
	const renderScene = SceneMap({
		first: firstRoute,
		second: secondRoute,
		third: thirdRoute
	});
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<Modal
				testID={'modal'}
				isVisible={gs.modal_mail}
				swipeDirection={[
					'down'
				]}
				backdropOpacity={0.3}
				animationIn='slideInUp'
				animationOut='slideOutDown'
				animationInTiming={120}
				animationOutTiming={120}
				backdropTransitionInTiming={120}
				backdropTransitionOutTiming={120}
				onBackdropPress={() => hideModal()}
				onSwipeComplete={() => hideModal()}
				onBackButtonPress={() => hideModal()}
				style={{
					justifyContent: 'flex-end',
					margin: 12
				}}
			>
				<Animated.View
					style={{
						height: 160,
						backgroundColor: 'white',
						borderRadius: 6
					}}
				>
					<Animated.View
						style={{
							flex: 1,
							padding: 15,
							flexDirection: 'column'
						}}
					>
						<View style={{ padding: 10, flexDirection: 'row' }}>
							<Icon name='ios-mail' type='ionicon' />
							<Text style={{ fontSize: 17, marginLeft: 8 }}>New Message</Text>
						</View>
						<View style={{ padding: 10, flexDirection: 'row' }}>
							<Icon name='ios-checkmark-circle-outline' type='ionicon' />
							<Text style={{ fontSize: 17, marginLeft: 8 }}>Mark All Message as Read</Text>
						</View>
						<View style={{ padding: 10, flexDirection: 'row' }}>
							<Icon name='ios-notifications' type='ionicon' />
							<Text style={{ fontSize: 17, marginLeft: 8 }}>Notification Settings</Text>
						</View>
					</Animated.View>
				</Animated.View>
			</Modal>
			<TabView
				style={{
					padding: 8,
					backgroundColor: 'transparent'
				}}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={initLayout}
			/>
		</View>
	);
};

// {/* <View style={{ flexDirection: 'row', paddingTop: 20, paddingLeft: 12 }}>
// 				<View style={{ padding: 7, borderBottomWidth: 1, borderBottomColor: 'blue' }}>
// 					<Text style={{ fontSize: 20.2 }}>Notifications</Text>
// 				</View>
// 				<View style={{ padding: 7 }}>
// 					<Text style={{ fontSize: 20.2 }}>Message</Text>
// 				</View>
// 				<View style={{ padding: 7 }}>
// 					<Text style={{ fontSize: 20.2 }}>Mod Mail</Text>
// 				</View>
// 			</View> */}
