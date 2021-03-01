import {
  Box, Center, SimpleGrid, Text,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { VscSmiley } from 'react-icons/vsc';

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
      <SimpleGrid columns={[1, null, 2]} spacing="40px" margin="25px">
        <SimpleGrid columns={[1, null, 2]} spacing="40px">

          <Box borderRadius="lg" bg="#2D3748" minWidth="300px" padding="10px">
            <Center>
              <Text
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="25px"
                fontWeight="extrabold"
                textAlign="center"
              >
                Event Details
              </Text>
            </Center>
            TITLE
            <br />
            DESCRIPTION
          </Box>
          <Box borderRadius="lg" bg="#2D3748" padding="10px">
            <Center>
              <Text
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="25px"
                fontWeight="extrabold"
                textAlign="center"
              >
                Mood Over Time
              </Text>
            </Center>
            <Line height="200px" data={data} />
          </Box>
          <Box borderRadius="lg" bg="#2D3748" padding="10px">
            <Center>
              <Text
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="25px"
                fontWeight="extrabold"
                textAlign="center"
              >
                Attendees Over Time
              </Text>
            </Center>
            <Line height="200px" data={data} />
          </Box>
          <Box borderRadius="lg" bg="#2D3748" padding="10px">
            <Center>
              <Text
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="25px"
                fontWeight="extrabold"
                textAlign="center"
              >
                Current Mood
              </Text>
            </Center>
            <Center>
              <VscSmiley color="green" fontSize="100px" />
            </Center>
          </Box>
        </SimpleGrid>
        <Box height="calc(100vh - 100px)" borderRadius="lg" padding="10px" bg="#2D3748">
          <Text
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            fontSize="25px"
            fontWeight="extrabold"
          >
            Feedback Panel
          </Text>
          {['testone', 'testtwo', 'testthree'].map((feedback) => (
            <Box borderWidth="1px" marginBottom="10px" borderRadius="lg" overflow="hidden" padding="10px">
              {feedback}
            </Box>
          ))}
        </Box>
      </SimpleGrid>
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
