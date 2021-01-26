import { AiOutlineLeft } from 'react-icons/ai';
import {
  Button, Text,
} from '@chakra-ui/react';

export default function CreateSession({
  setPageView,
}) {
  return (
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
  );
}
