import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Center, SimpleGrid, Text, useToast, Button,
} from '@chakra-ui/react';
import { useList, usePresence } from '@roomservice/react';
import { Line } from 'react-chartjs-2';
import { AiOutlineLeft } from 'react-icons/ai';
import { VscSmiley } from 'react-icons/vsc';

import {
  CgSmileMouthOpen, CgSmile, CgSmileNeutral, CgSmileSad,
} from 'react-icons/cg';
import { BiSad } from 'react-icons/bi';

import Layout from '../../components/Layout';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const test = 'event123';

export default function Home() {
  const router = useRouter();
  const toast = useToast();

  const [surveysList, setSurveysList] = useList(test, 'surveys');
  const [techIssuesList, setTechIssuesList] = useList(test, 'techIssues');
  const [moodList, setMoodList] = useList(test, 'mood');

  const [avgList, setAvgList] = useList(test, 'avg6'); // change number to switch to fresh data
  const [timeList, setTimeList] = useList(test, 'time6');
  const [attendeeList, setAttendeeList] = useList(test, 'attendee2');
  const [attendeeTimeList, setAttendeeTimeList] = useList(test, 'attendeeTime2');

  const [mood, setMood] = useState(0);
  const [attendance, setAttendance] = useState(0);

  const [joined, joinedClient] = usePresence('event2', 'joined');

  const attendeeData = {
    labels: attendeeTimeList,
    datasets: [
      {
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
        data: attendeeList,
      },
    ],
  };

  const moodData = {
    type: 'time',
    labels: timeList,
    datasets: [
      {
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
        data: avgList,
      },
    ],
  };

  const attendeeOptions = {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1,
        },
      }],
      xAxes: [{
        type: 'time',
        distribution: 'linear',
        time: {
          tooltipFormat: 'h:mm a',
          displayFormats: {
            minute: 'h:mm a',
          },
        },
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 5,
          min: Date.now() - (1000 * 60 * 60),
        },
      }],
    },
    legend: {
      display: false,
    },
  };

  const moodOptions = {
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: -1,
          suggestedMax: 1,
        },
      }],
      xAxes: [{
        type: 'time',
        distribution: 'linear',
        time: {
          tooltipFormat: 'h:mm a',
          displayFormats: {
            minute: 'h:mm a',
          },
        },
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 5,
          min: Date.now() - (1000 * 60 * 60),
        },
      }],
    },
    legend: {
      display: false,
    },
  };

  useInterval(() => {
    const time = new Date();

    const attendeeNum = Object.keys(joined).length;
    if (attendeeNum != attendance) {
      setAttendeeList?.push(attendance);
      setAttendeeTimeList?.push(time);
      setAttendance(attendeeNum);
    }

    console.log('average:', avgList);
    console.log('time:', timeList);
    console.log('mood', moodList);

    if (moodList.length > 0) {
      // ! do mood stuff here
      const len = avgList.length;

      if (len == 0) {
        setAvgList?.push(moodList[0].toFixed(2));
        setMoodList?.delete(0);
        setMood(moodList[0]);
        setTimeList?.push(time);
      } else {
        const average = (avgList[len - 1] * 0.5 + moodList[0] * 0.5); // this average gives the most recent mood score a 50% weighting
        // var average = ( avgList[len - 1] * len + moodList[0] ) / (len + 1) // this average would weight all the mood scores equally
        setAvgList?.push(average.toFixed(2));
        setMoodList?.delete(0);
        setMood(average);
        setTimeList?.push(time);
      }
    }
    if (techIssuesList.length > 0) {
      toast({
        title: (<>
          An attendee has reported the following:
          <br />
          <i>{techIssuesList[0]}</i>
        </>),
        status: 'error',
        isClosable: true,
        duration: null,
      });
      setTechIssuesList.delete(0);
    }
  }, 2000);

  useEffect(() => {
    joinedClient.set(true);
  }, []);

  return (
    <Layout title="Host View">
      <Center width="100vw" height="50px" background="#2D3748">
        <Button
          size="sm"
          leftIcon={<AiOutlineLeft />}
          variant="ghost"
          color="grey"
          onClick={() => router.push('/')}
        >
          Back
        </Button>
&nbsp;
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
            <b>Test event</b>
            <br />
            This is a test description about the test event for the Dragons' Den video.
            <br />
            <br />
            <b>Attendees: </b>
            {Object.keys(joined).length}
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
            <Line height="200px" data={moodData} options={moodOptions} />
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
            <Line height="200px" data={attendeeData} options={attendeeOptions} />
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
              {mood >= 0.75 && (<CgSmileMouthOpen color="lime" fontSize="200px" />)}
              {mood >= 0.25 && mood < 0.75 && (<CgSmile color="#66ff66" fontSize="200px" />)}
              {mood >= -0.25 && mood < 0.25 && (<CgSmileNeutral color="yellow" fontSize="200px" />)}
              {mood >= -0.75 && mood < -0.25 && (<CgSmileSad color="#ff3300" fontSize="200px" />)}
              {mood < -0.75 && (<BiSad color="red" fontSize="200px" />)}
            </Center>
          </Box>
        </SimpleGrid>
        <Box height="calc(100vh - 100px)" style={{ overflowY: 'auto' }} borderRadius="lg" padding="10px" bg="#2D3748">
          <Text
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            fontSize="25px"
            fontWeight="extrabold"
          >
            Feedback Panel
          </Text>
          {[].concat(surveysList).reverse().map((l) => (
            <Box borderWidth="1px" marginBottom="10px" borderRadius="lg" overflow="hidden" padding="10px">
              {l?.questions?.map((q) => (
                <span>
                  <b>{q.label}</b>
                  :
                  {' '}
                  {q.answer}
                  <br />
                </span>
              ))}
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
