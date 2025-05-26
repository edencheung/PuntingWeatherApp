import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, IconButton, Modal, Portal } from 'react-native-paper';

export function HelpModal({ showButton = false }: { showButton?: boolean }) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem('openedBefore').then((val) => {
      if (val === null) {
        setVisible(true);
        AsyncStorage.setItem('openedBefore', 'true');
      }
    });
  }, []);

  return (
    <>
      {showButton && (
        <IconButton
          accessibilityLabel="Help"
          icon="help"
          iconColor="grey"
          size={30}
          onPress={() => setVisible(true)}
        />
      )}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 40,
            margin: 20,
            borderRadius: 30,
          }}
        >
          <Text style={{ fontSize: 20 }}>
            Welcome to our punting weather app! Choose the day you're interested
            in at the bottom, then scroll down to see more detailed information.
            You can select your punting weather preferences, as well as see this
            message again, at any time in the settings. Happy punting! :)
          </Text>
          <Button
            mode="contained"
            style={{ marginTop: 30, padding: 5 }}
            labelStyle={{ fontSize: 18 }}
            onPress={() => setVisible(false)}
          >
            Get started
          </Button>
        </Modal>
      </Portal>
    </>
  );
}
