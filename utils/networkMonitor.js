import * as Network from 'expo-network';
import * as Sensor from 'expo-sensors';

export const getNetworkStrength = async () => {
  try {
    const state = await Network.getNetworkState();
    if (state.type === 'wifi' || state.type === 'cellular') {
      return { connected: true, type: state.type, signal: state.strength };
    }
    return { connected: false, type: 'none', signal: 0 };
  };
