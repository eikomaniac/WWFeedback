import { useState, useEffect } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import {
  BsChevronDown,
} from 'react-icons/bs';
import {
  Button,
  SimpleGrid,
  Box,
  Center,
  Input,
  Textarea,
  Menu,
  MenuButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {useDisclosure} from '@chakra-ui/react'
import DatePicker from './DatePicker.tsx'
import filenamify from 'filenamify';
import QuestionTemplate from './QuestionTemplate';
import "react-datepicker/dist/react-datepicker.css";

import Title from './Title';

const placeholderQuestion = {
  type: 'input',
  label: '',
  placeholder: '',
  optionGroup: [''],
  sliderGroup: ['', '', ''],
  helper: '',
  required: false,
};

const ourTemplate = {
    title: '',
    questions: [
      {
        type: 'radio',
        label: 'Is the content engaging?',
        placeholder: '',
        optionGroup: ['Yes','No'],
        sliderGroup: ['', '', ''],
        helper: 'Please select an option.',
        required: true,
      },
      {
        type: 'radio',
        label: 'Are you hearing the presenter well?',
        placeholder: '',
        optionGroup: ['Yes','No'],
        sliderGroup: ['', '', ''],
        helper: 'Please select an option.',
        required: true,
      },
      {
        type: 'slider',
        label: 'How well can you see the presented content?',
        placeholder: '',
        optionGroup: ['',''],
        sliderGroup: ['Not at all', 'Can see it, but not clearly', 'Can clearly see it'],
        helper: 'Please move the slider to indicate how well you can see the presented content.',
        required: true,
      },
      {
        type: 'input',
        label: 'Describe the way you feel about the content.',
        placeholder: '',
        optionGroup: ['',''],
        sliderGroup: ['', '', ''],
        helper: 'Use the text area to indicate how you feel.',
        required: true,
      },
    ],
}

export default function CreateEvent({
  setPageView,
}) {
  const [template, setTemplate] = useState(ourTemplate);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tabs, setTabs] = useState(['1']);
  const [eventType, setEventType] = useState('Session')

  const [isSession, setIsSession] = useState(true);
  const [isSeries, setIsSeries] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [newSeriesAdded, setNewSeriesAdded] = useState(false)
  const [seriesOfEvent, setSeriesOfEvent] = useState([])

  useEffect(() => {
    setTitle('')
    setDescription('')
    setStartDate(null)
  },[newSeriesAdded, seriesOfEvent])

  const onReaderLoad = (e) => {
    const obj = JSON.parse(e.target.result);
    setTemplate(obj);
  };

  const importTemplate = (e) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(e.target.files[0]);
  };

  const exportTemplate = () => {
    const json = JSON.stringify(template);
    const dataURL = `data:application/json,${json}`;

    const anchor = document.getElementById('export-template');
    anchor.setAttribute('download', `${filenamify(title)}${title.trim().length !== 0 ? ' ' : ''}Template.json`);
    anchor.setAttribute('href', dataURL);
    anchor.click();
  };

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAdd = (someTitle, someDescription, someStartDate) => {

    const isTitleEmpty = (someTitle === '')
    const isDescriptionEmpty = (someDescription === '')
    const isStartDateNull = (someStartDate === null)

    const allGood = (!isTitleEmpty && !isDescriptionEmpty && !isStartDateNull)

    if(allGood){
      setNewSeriesAdded(!newSeriesAdded)
      const newList = seriesOfEvent.concat({'title': someTitle, 'description':someDescription, 'date':someStartDate})
      setSeriesOfEvent(newList)
    }

    console.log(seriesOfEvent)

  }

  return (
    <div>
      <Center>
        <div>
          <Button
            marginBottom="-20px"
            size="sm"
            leftIcon={<AiOutlineLeft />}
            variant="ghost"
            color="grey"
            onClick={() => setPageView('home')}
          >
            Back
          </Button>
          <Title title="Create Event" style={{ maxWidth: 427 }} />
        </div>
      </Center>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing="20px">
        <Box ml="20px">
          <Tabs>
            <TabList>
              {tabs.map((tab) => <Tab>{tab}</Tab>)}
              <Tab onClick={() => setTabs((t) => [...t, t.length + 1])}>+</Tab>
            </TabList>

            <TabPanels>
              {tabs.map(() => (
                <TabPanel>
                  {template?.questions?.map((question, questionNo) => (<QuestionTemplate template={template} setTemplate={setTemplate} question={question} questionNo={questionNo} />))}
                  <Button
                    colorScheme="green"
                    leftIcon={<FaPlus />}
                    isLoading={false}
                    type="submit"
                    onClick={() => {
                      const temp = { ...template };
                      temp.questions.push({ ...placeholderQuestion });
                      setTemplate(temp);
                    }}
                  >
                    Question
                  </Button>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
        <Box mr="20px" padding="10px">
          <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
              {eventType}
            </MenuButton>
            <MenuList>
              {['Session', 'Series', 'Project'].map((type, index) => (
                <MenuItem key={index} onClick={() => {
                  setEventType(type)
                  if(type==='Project'){
                    setIsProject(true)
                    setIsSeries(false)
                    setIsSession(false)
                  }
                  if(type==='Session'){
                    setIsProject(false)
                    setIsSeries(false)
                    setIsSession(true)
                  }
                  if(type==='Series'){
                    setIsProject(false)
                    setIsSeries(true)
                    setIsSession(false)
                  }
                }}>{type}</MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Input
            size="lg"
            placeholder="Event Title"
            variant="flushed"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            variant="filled"
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {isProject && (<>
              <br /> <br />
              <DatePicker selected={startDate} placeholderText="Choose a starting date " onChange={date => setStartDate(date)} />
              <br /> <br />
              <DatePicker selected={endDate} placeholderText="Choose an ending date " onChange={date => setEndDate(date)} />
              <br /> <br />
              </>
            )
          }
          {isSession && (<>
            <br /> <br />
              <DatePicker selected={startDate} placeholderText="Choose a date" onChange={date => setStartDate(date)} />
              <br /> <br />
              </>
            )
          }
          {isSeries && (<>
            <br /> <br />
            <DatePicker selected={startDate} placeholderText="Choose a starting date " onChange={date => setStartDate(date)} />
            <br />
            <Button colorScheme="teal" variant="solid" onClick={() => handleAdd(title, description, startDate)}>
              Add new event
            </Button>
            <br/> <br />
            Current events: <br />
            {seriesOfEvent.map((event,index) => {
              return (
                <div>
                  {event.title} ---- {event.description} ---- breaks when trying to put the date?
                </div>
              )
            })}
            </>
          )}
          <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
              Template
            </MenuButton>
            <MenuList>
              {['General', '+ Custom'].map((type, index) => (
                <MenuItem key={index} onClick={() => {
                  if(index===1) setTemplate({...placeholderQuestion})
                  if(index===0) setTemplate(ourTemplate) 
                }}>{type}</MenuItem>
              ))}
            </MenuList>
          </Menu>
          <input onChange={importTemplate} id="import-template" type="file" accept=".json" style={{ display: 'none' }} />
          <Button variant="outline" onClick={() => document.getElementById('import-template').click()}>Import</Button>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
          <a id="export-template" style={{ display: 'none' }} />
          <Button variant="outline" onClick={() => exportTemplate()}>Export</Button>
          <br />
          <Button colorScheme="teal" variant="solid" onClick={onOpen}>
            Schedule Event
          </Button>          
          <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Your event codes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Host Code: 384723 <br/>
              Attendee Code: 945855
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </Box>
      </SimpleGrid>
    </div>
  );
}
