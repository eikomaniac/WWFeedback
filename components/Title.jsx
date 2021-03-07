import {
  Text,
} from '@chakra-ui/react';

export default function Title({
  title,
  style = {},
}) {
  return (
    <Text
      bgGradient="linear(to-l, #7928CA,#FF0080)"
      bgClip="text"
      fontSize="6xl"
      fontWeight="extrabold"
      textAlign="center"
      style={style}
    >
      {title}
    </Text>
  );
}
