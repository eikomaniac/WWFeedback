import { useState } from 'react';
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
} from '@chakra-ui/react';

import filenamify from 'filenamify';
import QuestionTemplate from './QuestionTemplate';

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

export default function CreateEvent({
  setPageView,
}) {
  const [template, setTemplate] = useState({
    title: '',
    questions: [
      { ...placeholderQuestion },
    ],
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tabs, setTabs] = useState(['1']);

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
              Session
            </MenuButton>
            <MenuList>
              {['Session', 'Series', 'Project'].map((type, index) => (
                <MenuItem key={index}>{type}</MenuItem>
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
          <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
              Template
            </MenuButton>
            <MenuList>
              {['General', '+ Custom'].map((type, index) => (
                <MenuItem key={index}>{type}</MenuItem>
              ))}
            </MenuList>
          </Menu>
          <input onChange={importTemplate} id="import-template" type="file" accept=".json" style={{ display: 'none' }} />
          <Button variant="outline" onClick={() => document.getElementById('import-template').click()}>Import</Button>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
          <a id="export-template" style={{ display: 'none' }} />
          <Button variant="outline" onClick={() => exportTemplate()}>Export</Button>
          <br />
          <Button colorScheme="teal" variant="solid">
            Schedule Event
          </Button>
        </Box>
      </SimpleGrid>
    </div>
  );
}
