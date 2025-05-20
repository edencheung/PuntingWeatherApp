import { Dimensions, Text, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function CentralDisplay() {
  return (
    <View style={{ height: SCREEN_HEIGHT * 0.25, alignItems: "center", justifyContent: 'flex-start', paddingTop: 0, backgroundColor: 'transparent' }}>
      <Text style={{ fontSize: 24, color: 'black' }}>11th May | Best time 1:48 pm</Text>
      <Text style={{ fontSize: 24, color: 'black' }}>Hello World</Text>
      <Text style={{ fontSize: 24, color: 'black' }}>Hello World</Text>
      <Text style={{ fontSize: 24, color: 'black' }}>Hello World</Text>
      <Text style={{ fontSize: 24, color: 'black' }}>Hello World</Text>
    </View>
  )
}