import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import {
  Button, Text, Center, PinInput, PinInputField, HStack, useToast,
} from '@chakra-ui/react';
import { AiOutlineLeft } from 'react-icons/ai';

import Title from './Title';

export default function JoinEvent({
  setPageView,
}) {
  const [loadingEvent, setLoadingEvent] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const onJoinCodeEntered = async (code) => {
    setLoadingEvent(true);

    try {
      const res = await axios.get('/api/v1/events', {
        params: {
          id: code,
        },
      });
      if (res.data.event.type === 'host') {
        router.push(`/host/${code}`);
      } else if (res.data.event.type === 'join') {
        router.push(`/event/${code}`);
      }
    } catch (err) {
      toast({
        title: (<>
          <i>{`${code} `}</i>
          is not a valid event code.
        </>),
        description: 'Please try again.',
        status: 'error',
        isClosable: true,
      });
    }

    setLoadingEvent(false);
  };

  return (
    <div>
      <Button size="sm" leftIcon={<AiOutlineLeft />} variant="ghost" color="grey" onClick={() => setPageView('home')}>
        Back
      </Button>
      <Title title="Join Event" />
      <Text color="gray.500" textAlign="center">
        Please enter the event code below
        <br />
        <Button style={{ cursor: 'default' }} paddingBottom="10px" isLoading={loadingEvent} variant="ghost" disabled />
      </Text>
      <Center>
        <HStack>
          <PinInput autoFocus size="lg" isDisabled={loadingEvent} onComplete={onJoinCodeEntered}>
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
