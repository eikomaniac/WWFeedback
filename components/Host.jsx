import { useState, useEffect } from 'react';
import { useList, usePresence } from '@roomservice/react';
import {
  Button, Text, VStack,
} from '@chakra-ui/react';
import { AiOutlineLeft } from 'react-icons/ai';

export default function Host({
  setPageView,
}) {
  const [feedback, list] = useList('myroom', 'feedback');

  function onCheckOff(i) {
    if (!list) return;
    list.delete(i);
  }

  const [joined, joinedClient] = usePresence('myroom', 'joined');

  useEffect(() => {
    joinedClient.set(true);
  }, []);

  return (
    <div className="container" style={{ display: 'grid', placeItems: 'center', height: '90vh' }}>
      <div>
        <Button size="sm" leftIcon={<AiOutlineLeft />} variant="ghost" color="grey" onClick={() => setPageView('home')}>
          Back
        </Button>
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          paddingBottom="25px"
        >
          Host View
        </Text>
        Attendees:
        {' '}
        {Object.keys(joined).length}
        <VStack
          spacing={4}
          align="stretch"
        >
          <Text
            fontSize="xl"
          >
            Feedback appears here
          </Text>
          {feedback.map((l, i) => (
            <div
              key={JSON.stringify(l)}
              onClick={() => onCheckOff(i)}
            >
              {l.object || l}
            </div>
          ))}
        </VStack>
      </div>
    </div>
  );
}
