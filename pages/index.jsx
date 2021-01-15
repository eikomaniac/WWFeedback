import { useState } from 'react';
import axios from 'axios';
import {
  Button, Text, Center, ButtonGroup, PinInput, PinInputField, HStack, useToast,
} from '@chakra-ui/react';
import { IoCreateOutline, IoEnterOutline } from 'react-icons/io5';
import { AiOutlineLeft } from 'react-icons/ai';
import Layout from '../components/Layout';

export default function Home() {
  const [pageView, setPageView] = useState('home');
  const [loadingSession, setLoadingSession] = useState(false);
  const toast = useToast();

  const onJoinCodeEntered = async (code) => {
    setLoadingSession(true);

    try {
      await axios.get('/api/sessions', {
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
    <Layout title={pageView === 'home' ? undefined : `${pageView.charAt(0).toUpperCase() + pageView.slice(1)} Session`}>
      <div className="container" style={{ display: 'grid', placeItems: 'center', height: '90vh' }}>
        {pageView === 'home' && (
          <div>
            <Text
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
              paddingBottom="25px"
            >
              WWFeedback
            </Text>
            <Center>
              <ButtonGroup spacing="10">
                <Button size="lg" leftIcon={<IoEnterOutline />} onClick={() => setPageView('join')}>Join</Button>
                <Button size="lg" leftIcon={<IoCreateOutline />} onClick={() => setPageView('create')}>Create</Button>
              </ButtonGroup>
            </Center>
          </div>
        )}
        {pageView === 'join' && (
          <div>
            <Button size="sm" leftIcon={<AiOutlineLeft />} variant="ghost" color="grey" onClick={() => setPageView('home')}>
              Back
            </Button>
            <Text
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              Join Session
            </Text>
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
        )}
        {pageView === 'create' && (
          <div>
            <Button size="sm" leftIcon={<AiOutlineLeft />} variant="ghost" color="grey" onClick={() => setPageView('home')}>
              Back
            </Button>
            <Text
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              Create Session
            </Text>
            <Text paddingBottom="50px" color="gray.500" textAlign="center">
              Work In Progress
            </Text>
          </div>
        )}
      </div>
    </Layout>
  );
}
