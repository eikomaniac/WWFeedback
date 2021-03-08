import { useState, useEffect } from 'react';
import { useList, usePresence } from '@roomservice/react';
import {
  Button, Text, Input,
} from '@chakra-ui/react';
import { AiOutlineLeft } from 'react-icons/ai';

export default function Attendee({
  setPageView,
}) {
  const [text, setText] = useState('');
  const [feedback, list] = useList('myroom', 'feedback');

  function onEnterPress() {
    if (!list) return;
    list.push(text);
    setText('');
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
          Attendee View
        </Text>
        <Input
          placeholder="Send Feedback"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && text) {
              onEnterPress();
            }
          }}
        />
      </div>
    </div>
  );
}
