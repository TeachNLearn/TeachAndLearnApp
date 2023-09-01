import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CoinsSvg from '../../svgComponents/CoinsSvg';

interface Props {}

const MyWallet: React.FC<Props> = () => {
  return (
    <View style={styles.parentContainer}>
      <View
        style={{
          padding: 20,
          backgroundColor: '#FFF',
          elevation: 4,
          width: 350,
          height: 150,
          marginTop: 50,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          borderRadius: 25,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: '#5f6c7b',
            fontWeight: '600',
            fontFamily: 'Nunito',
            textDecorationLine: 'underline',
          }}
        >
          Total Balance
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CoinsSvg height={20} width={20} />
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '700',
              fontFamily: 'Nunito',
            }}
          >
            {' '}
            1050
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30,
          width: 350,
        }}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: '#FFF',
            elevation: 4,
            width: 160,
            height: 100,
            marginTop: 50,
            flexDirection: 'column',
            borderRadius: 25,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#5f6c7b',
              fontWeight: '600',
              fontFamily: 'Nunito',
              textDecorationLine: 'underline',
            }}
          >
            Coins from class Reviews
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '700',
              fontFamily: 'Nunito',
              marginTop: 10,
            }}
          >
            0
          </Text>
        </View>
        <View
          style={{
            padding: 20,
            backgroundColor: '#FFF',
            elevation: 4,
            width: 160,
            height: 100,
            marginTop: 50,
            flexDirection: 'column',
            borderRadius: 25,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#5f6c7b',
              fontWeight: '600',
              fontFamily: 'Nunito',
              textDecorationLine: 'underline',
            }}
          >
            Coins from class Reviews
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '700',
              fontFamily: 'Nunito',
              marginTop: 10,
            }}
          >
            0
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
  },
});

export default MyWallet;
