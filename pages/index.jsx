import { useState } from 'react';
import {
  Button, Center, ButtonGroup,
} from '@chakra-ui/react';
import { IoCreateOutline, IoEnterOutline } from 'react-icons/io5';
import Layout from '../components/Layout';

import Title from '../components/Title';
import JoinSession from '../components/JoinSession';
import CreateSession from '../components/CreateSession';

export default function Home() {
  const [pageView, setPageView] = useState('home');

  return (
    <Layout title={pageView === 'home' ? undefined : `${pageView.charAt(0).toUpperCase() + pageView.slice(1)} Session`}>
      {['home', 'join'].includes(pageView) && (
        <div style={{ display: 'grid', placeItems: 'center', height: '85vh' }}>
          {pageView === 'home' && (
            <div>
              <Title title="WWFeedback" style={{ paddingBottom: 25 }} />
              <Center>
                <ButtonGroup spacing="10">
                  <Button size="lg" leftIcon={<IoEnterOutline />} onClick={() => setPageView('join')}>Join</Button>
                  <Button size="lg" leftIcon={<IoCreateOutline />} onClick={() => setPageView('create')}>Create</Button>
                </ButtonGroup>
              </Center>
            </div>
          )}
          {pageView === 'join' && <JoinSession setPageView={setPageView} />}
        </div>
      )}
      {pageView === 'create' && <CreateSession setPageView={setPageView} />}
    </Layout>
  );
}
