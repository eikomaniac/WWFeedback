import { useState } from 'react';
import {
  Button, Center, ButtonGroup,
} from '@chakra-ui/react';
import { IoCreateOutline, IoEnterOutline } from 'react-icons/io5';

import Layout from '../components/Layout';
import Title from '../components/Title';
import JoinEvent from '../components/JoinEvent';
import CreateEvent from '../components/CreateEvent';

export default function Home() {
  const [pageView, setPageView] = useState('create');

  return (
    <Layout title={pageView === 'home' ? undefined : `${pageView.charAt(0).toUpperCase() + pageView.slice(1)} Event`}>
      {['home', 'join'].includes(pageView) && (
        <div className="container" style={{ display: 'grid', placeItems: 'center', height: '85vh' }}>
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
          {pageView === 'join' && <JoinEvent setPageView={setPageView} />}
        </div>
      )}
      {pageView === 'create' && <CreateEvent setPageView={setPageView} />}
    </Layout>
  );
}
