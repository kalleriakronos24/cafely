import React from 'react';
import {
    Picker,
    View
} from 'react-native';

const PickerTime = () => {

    for(let t = 0; t < 60; t++){
        return (
            <Picker.Item label={`${t}`} value={`${t}`}  />
        )
    }
}

export default PickerTime;