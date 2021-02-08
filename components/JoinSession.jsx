import axios from 'axios';
import { useState } from 'react';
import {
  Button, Text, Center, PinInput, PinInputField, HStack, useToast,
} from '@chakra-ui/react';
import { AiOutlineLeft } from 'react-icons/ai';

import Title from './Title';

export default function JoinSession({
  setPageView,
}) {
  const [loadingSession, setLoadingSession] = useState(false);
  const toast = useToast();

  const onJoinCodeEntered = async (code) => {
    setLoadingSession(true);

    try {
      await axios.get('/api/v1/sessions', {
        params: {
          id: code,
        },
      });

      console.log('success'); // ! Change later
    } catch (err) {
      toast({
        title: (<>
          <i>{`${code} `}</i>
          is not a valid session code.
        </>),
        description: 'Please try again.',
        status: 'error',
        isClosable: true,
      });
    }

    setLoadingSession(false);
  };

  return (
    <div>
      <Button size="sm" leftIcon={<AiOutlineLeft />} variant="ghost" color="grey" onClick={() => setPageView('home')}>
        Back
      </Button>
      <Title title="Join Session" />
      <Text color="gray.500" textAlign="center">
        Please enter the session code below
        <br />
        <Button style={{ cursor: 'default' }} paddingBottom="10px" isLoading={loadingSession} variant="ghost" disabled />
      </Text>
      <Center>
        <HStack>
          <PinInput autoFocus size="lg" isDisabled={loadingSession} onComplete={onJoinCodeEntered}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </Center>
    </div>
  );
}
