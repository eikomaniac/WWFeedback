import axios from 'axios';
import { useState, useEffect } from 'react';
import { useList, usePresence } from '@roomservice/react';
import {
  Box, Center, SimpleGrid, Text, Tabs, Button, Tab, TabPanel, TabPanels, TabList, Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { FaPlus } from 'react-icons/fa';
import {
  CgSmileMouthOpen, CgSmile, CgSmileNeutral, CgSmileSad,
} from 'react-icons/cg';
import { BiSad } from 'react-icons/bi';
import { GoAlert } from 'react-icons/go';

import Layout from '../../components/Layout';
import Question from '../../components/Question';

const placeholderQuestion = {
  type: 'input',
  label: '',
  placeholder: '',
  optionGroup: [''],
  sliderGroup: ['', '', ''],
  helper: '',
  required: false,
  answer: '',
};

export default function Home() {
  const [selectedMood, setSelectedMood] = useState();
  const [tabs, setTabs] = useState(['1']);
  const [techIssue, setTechIssue] = useState();
  const [techIssueModal, setTechIssueModal] = useState(false);

  const [surveysList, setSurveysList] = useList('event', 'surveys');
  const [techIssuesList, setTechIssuesList] = useList('event', 'techIssues');
  const [moodList, setMoodList] = useList('event', 'mood');

  const [joined, joinedClient] = usePresence('event', 'joined');

  const [template, setTemplate] = useState({
    title: '',
    questions: [
      { ...placeholderQuestion },
    ],
  });

  const onSendFeedback = async () => {
    if (!setSurveysList) return;
    let feedbackText = '';
    for (let i = 0; i < template.questions.length; i++) {
      feedbackText += `${template.questions[i].answer}. `;
    }
    try {
      const res = await axios.post('/api/v1/feedback', {
        feedback: feedbackText,
      });
      const result = res.data;
      console.log(result);
      setMoodList.push(result);
    } catch (err) {
      console.log('failed');
    }
    setSurveysList.push(template);
  };

  useEffect(() => {
    joinedClient.set(true);
  }, []);

  const sendMood = async (moodScore) => {
    setSelectedMood(moodScore);
    setMoodList.push(moodScore);
  };

  return (
    <Layout title="Event">
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
          <CgSmileMouthOpen color="lime" fontSize="100px" style={{ cursor: 'pointer', opacity: [undefined, 1].includes(selectedMood) ? 1 : 0.3 }} onClick={() => sendMood(1)} />
          <CgSmile color="#66ff66" fontSize="100px" style={{ cursor: 'pointer', opacity: [undefined, 0.5].includes(selectedMood) ? 1 : 0.3 }} onClick={() => sendMood(0.5)} />
          <CgSmileNeutral color="yellow" fontSize="100px" style={{ cursor: 'pointer', opacity: [undefined, 0].includes(selectedMood) ? 1 : 0.3 }} onClick={() => sendMood(0)} />
          <CgSmileSad color="#ff3300" fontSize="100px" style={{ cursor: 'pointer', opacity: [undefined, -0.5].includes(selectedMood) ? 1 : 0.3 }} onClick={() => sendMood(-0.5)} />
          <BiSad color="red" fontSize="100px" style={{ cursor: 'pointer', opacity: [undefined, -1].includes(selectedMood) ? 1 : 0.3 }} onClick={() => sendMood(-1)} />
        </Center>
      </Box>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing="20px">
        <Box margin="10px" borderRadius="lg" bg="#2D3748" padding="10px">
          <Text
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            fontSize="25px"
            fontWeight="extrabold"
          >
            Surveys
          </Text>
          <Tabs>
            <TabList>
              {tabs.map((tab) => <Tab>{tab}</Tab>)}
            </TabList>

            <TabPanels>
              {tabs.map(() => (
                <TabPanel>
                  {template?.questions?.map((question, questionNo) => (<Question template={template} setTemplate={setTemplate} question={question} questionNo={questionNo} />))}
                  <Button onClick={onSendFeedback}>
                    Send Feedback
                  </Button>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
        <Box margin="10px">
          <Button leftIcon={<GoAlert />} colorScheme="red" onClick={() => setTechIssueModal(true)}>
            Report Technical Issue
          </Button>
          <Modal isOpen={techIssueModal} onClose={() => setTechIssueModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Report A Technical Issue</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Select onChange={(e) => setTechIssue(e.target.value)} placeholder="Select technical issue" size="lg">
                  <option value="Host microphone muted/not working">Host microphone muted/not working</option>
                  <option value="Presentation not visible">Presentation not visible</option>
                  <option value="No audible sound">No audible sound</option>
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button disabled={!techIssue} colorScheme="blue" mr={3} onClick={() => setTechIssuesList.push(techIssue)}>
                  Send Issue
                </Button>
                <Button variant="outline" onClick={() => setTechIssueModal(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
