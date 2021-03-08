import axios from 'axios';
import { useState, useEffect } from 'react';
import { useList, usePresence } from '@roomservice/react';
import {
  Button, Text, Input,
} from '@chakra-ui/react';
import { AiOutlineLeft } from 'react-icons/ai';

export default function Attendee({
  setPageView,
}) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState(0);
  const [feedback, list] = useList("myroom2", "feedback2");

  const onFeedback = async (feedback) => {
    console.log(text)
    try {
      await axios.post('/api/v1/feedback', {
        feedback
      }).then((response) => { 
        var result = response.data; 
        console.log(result);
        setMood(mood + result)
        return (result); 
      });
      
    } catch (err) {
      console.log('failed');
    }
  }

  function onEnterPress() {
    if (!list) return;
    list.push(text);
    onFeedback(text);
    setText("");
  }

  const [joined, joinedClient] = usePresence('myroom', 'joined');

  useEffect(() => {
    joinedClient.set(true);
  }, []);

  return (
<<<<<<< HEAD
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
=======
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
                if (e.key === "Enter" && text) {
                  onEnterPress();
                }
              }}
            />
            <Text
              fontSize="xl"
            >
              Current Mood : {mood.toFixed(3)}
            </Text>
        </div>
>>>>>>> 6d652a198a6612d8967b34e88049242b0690ffba
    </div>
  );
}
