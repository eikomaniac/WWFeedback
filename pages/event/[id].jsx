import { useState } from 'react';
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
import { GoAlert } from 'react-icons/go';
import { BiSad } from 'react-icons/bi';

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
};

export default function Home() {
  const [selectedMood, setSelectedMood] = useState();
  const [tabs, setTabs] = useState(['1']);
  const [techIssueModal, setTechIssueModal] = useState(false);

  const [template, setTemplate] = useState({
    title: '',
    questions: [
      { ...placeholderQuestion },
    ],
  });

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
          <BiSad color="red" fontSize="100px" style={{ cursor: 'pointer', opacity: [undefined, -1].includes(selectedMood) ? 1 : 0.5 }} onClick={() => sendMood(-1)} />
          <CgSmileSad color="#ff3300" fontSize="100px" style={{ cursor: 'pointer', opacity: [undefined, -0.5].includes(selectedMood) ? 1 : 0.5 }} onClick={() => sendMood(-0.5)} />
          <CgSmileNeutral color="yellow" fontSize="100px" style={{ cursor: 'pointer', opacity: [undefined, 0].includes(selectedMood) ? 1 : 0.5 }} onClick={() => sendMood(0)} />
          <CgSmile color="#66ff66" fontSize="100px" style={{ cursor: 'pointer', opacity: [undefined, 0.5].includes(selectedMood) ? 1 : 0.5 }} onClick={() => sendMood(0.5)} />
          <CgSmileMouthOpen color="lime" fontSize="100px" style={{ cursor: 'pointer', opacity: [undefined, 1].includes(selectedMood) ? 1 : 0.5 }} onClick={() => sendMood(1)} />
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
                <Select placeholder="Select technical issue" size="lg">
                  <option value="option1">Host microphone muted/not working</option>
                  <option value="option2">Presentation not visible</option>
                  <option value="option3">No audible sound</option>
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => setTechIssueModal(false)}>
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
