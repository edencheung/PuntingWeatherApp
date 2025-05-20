import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

export default function RadioList({ data, onSelect, selectedId, horizontal }: 
    { data: { text: string; id: string; }[], onSelect: (id: string) => void, selectedId: string, horizontal: boolean }) {
    return (
        <View style={{ display: "flex", flexDirection: horizontal ? "row" : "column"}}>
            {data.map((item) => (
              <View style={{ display: "flex", flexDirection: horizontal ? "column" : "row", alignItems: "center"}} key={item.id}>
                  <RadioButton
                    value={item.text}
                    status={selectedId === item.id ? "checked" : "unchecked"}
                    onPress={() => onSelect(item.id)} 
                  />
                  <Text>{item.text}</Text>
              </View>
            ))}
        </View>
    )
}