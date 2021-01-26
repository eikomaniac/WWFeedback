import { useState } from 'react';
import {
  Button, Text, Center, ButtonGroup,
} from '@chakra-ui/react';
import { IoCreateOutline, IoEnterOutline } from 'react-icons/io5';
import Layout from '../components/Layout';

import JoinSession from '../components/JoinSession';
import CreateSession from '../components/CreateSession';

export default function Home() {
  const [pageView, setPageView] = useState('home');

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
        {pageView === 'join' && <JoinSession setPageView={setPageView} />}
        {pageView === 'create' && <CreateSession setPageView={setPageView} />}
      </div>
    </Layout>
  );
}
