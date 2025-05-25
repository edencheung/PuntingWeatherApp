import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function RadioList<T extends number | string>({
  data,
  onSelect,
  selectedId,
  horizontal,
}: {
  data: { text: string; id: T }[];
  onSelect: (id: T) => void;
  selectedId: T;
  horizontal: boolean;
}) {
  return (
    <View
      style={{ display: 'flex', flexDirection: horizontal ? 'row' : 'column' }}
    >
      {data.map((item) => (
        <View
          style={{
            display: 'flex',
            flexDirection: horizontal ? 'column' : 'row',
            alignItems: 'center',
          }}
          key={item.id}
        >
          <RadioButton
            value={item.text}
            status={selectedId === item.id ? 'checked' : 'unchecked'}
            onPress={() => onSelect(item.id)}
          />
          <Text
            style={{
              fontSize: horizontal ? 15 : 18,
              color: horizontal ? '#444444' : 'black',
              marginTop: -4,
            }}
          >
            {item.text}
          </Text>
        </View>
      ))}
    </View>
  );
}
