import { useState } from 'react';
import {
  Box, Center, SimpleGrid, Text,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  CgSmileMouthOpen, CgSmile, CgSmileNeutral, CgSmileSad,
} from 'react-icons/cg';
import { BiSad } from 'react-icons/bi';

import Layout from '../../components/Layout';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

export default function Home() {
  const [selectedMood, setSelectedMood] = useState();
  const sendMood = (moodScore) => {
    setSelectedMood(moodScore);
  };

  return (
    <Layout title="Host View">
      <Center width="100vw" height="50px" background="#2D3748">
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="35px"
          fontWeight="extrabold"
          textAlign="center"
        >
          WWFeedback
        </Text>
      </Center>
      <Box margin="10px" borderRadius="lg" bg="#2D3748" padding="10px">
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="25px"
          fontWeight="extrabold"
        >
          Surveys
        </Text>
      </Box>
      <Box margin="10px" borderRadius="lg" bg="#2D3748" padding="10px">
        <Center>
          <Text
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            fontSize="25px"
            fontWeight="extrabold"
            textAlign="center"
          >
            How do you feel about this event?
          </Text>
        </Center>
        <Center>
          <BiSad color="red" fontSize="100px" style={{ cursor: 'pointer', opacity: selectedMood === -1 ? 1 : 0.5 }} onClick={() => sendMood(-1)} />
          <CgSmileSad color="#ff3300" fontSize="100px" style={{ cursor: 'pointer', opacity: selectedMood === -0.5 ? 1 : 0.5 }} onClick={() => sendMood(-0.5)} />
          <CgSmileNeutral color="yellow" fontSize="100px" style={{ cursor: 'pointer', opacity: selectedMood === 0 ? 1 : 0.5 }} onClick={() => sendMood(0)} />
          <CgSmile color="#66ff66" fontSize="100px" style={{ cursor: 'pointer', opacity: selectedMood === 0.5 ? 1 : 0.5 }} onClick={() => sendMood(0.5)} />
          <CgSmileMouthOpen color="lime" fontSize="100px" style={{ cursor: 'pointer', opacity: selectedMood === 1 ? 1 : 0.5 }} onClick={() => sendMood(1)} />
        </Center>
      </Box>
    </Layout>
  );
}

// export async function getStaticPaths(context) {
//   // const res = await axios.get('/api/v1/sessions', {
//   //   params: {
//   //     id: code,
//   //   },
//   // });

//   return {
//     paths: [
//       { params: { } }, // See the "paths" section below
//     ],
//     fallback: false, // See the "fallback" section below
//   };
// }
