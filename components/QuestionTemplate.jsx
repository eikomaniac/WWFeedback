import { useState } from 'react';
import {
  FormControl,
  Checkbox,
  RadioGroup,
  HStack,
  Radio,
  IconButton,
  Flex,
  Spacer,
  FormHelperText,
  FormLabel,
  Input,
  Slider,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import {
  BsPlusCircle, BsPlusSquare, BsChevronDown, BsFillTrashFill,
} from 'react-icons/bs';

export default function Layout({
  question,
  questionNo,
  template,
  setTemplate,
}) {
  const [deleteNo, setDeleteNo] = useState([-1, -1]);

  const updateTemplate = (val, index, prop) => {
    const temp = { ...template };
    temp.questions[index][prop] = val;
    setTemplate(temp);
  };

  return (
    <FormControl key={questionNo} isRequired={['input', 'radio'].includes(question.type) && question.required} marginBottom="25px">
      <Flex>
        <FormLabel />
        <Input
          flex="1"
          variant="flushed"
          placeholder="Question"
          value={question.label}
          onChange={(e) => updateTemplate(e.target.value, questionNo, 'label')}
          marginLeft="-10px"
        />
        <div style={{ marginTop: 3, marginLeft: 10, display: 'inline-block' }}>
          <FaChevronUp
            onClick={() => {
              const temp = { ...template };
              const tempQuestion = temp.questions[questionNo];
              temp.questions.splice(questionNo, 1);
              temp.questions.splice(questionNo - 1, 0, tempQuestion);
              setTemplate(temp);
            }}
            style={{ cursor: 'pointer', visibility: questionNo === 0 ? 'hidden' : 'visible' }}
          />
          {questionNo !== template.questions.length - 1 && (
            <FaChevronDown
              onClick={() => {
                const temp = { ...template };
                const tempQuestion = temp.questions[questionNo];
                temp.questions.splice(questionNo, 1);
                temp.questions.splice(questionNo + 1, 0, tempQuestion);
                setTemplate(temp);
              }}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
        <div>
          <Menu>
            <MenuButton marginLeft="10px" as={Button} rightIcon={<BsChevronDown />}>
              {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
            </MenuButton>
            <MenuList>
              {['input', 'radio', 'slider', 'checkbox'].map((type, index) => (
                <MenuItem key={index} onClick={() => updateTemplate(type, questionNo, 'type')}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
              ))}
            </MenuList>
          </Menu>
          {template.questions.length > 1 && (
            <IconButton
              onClick={() => {
                const temp = { ...template };
                temp.questions.splice(questionNo, 1);
                setTemplate(temp);
              }}
              marginLeft="10px"
              icon={<BsFillTrashFill />}
              colorScheme="red"
            />
          )}
        </div>
      </Flex>
      {['input', 'radio'].includes(question.type) && (
        <Checkbox
          defaultIsChecked={question.required}
          onChange={(e) => updateTemplate(e.target.checked, questionNo, 'required')}
        >
          Required?
        </Checkbox>
      )}
      {question.type === 'input' && (
        <Input
          style={{ color: '#a9a9a9' }}
          placeholder="Placeholder Text"
          value={question.placeholder}
          onChange={(e) => updateTemplate(e.target.value, questionNo, 'placeholder')}
        />
      )}
      {question.type === 'radio' && (
        <RadioGroup>
          <HStack spacing="24px">
            {question.optionGroup.map((radio, radioNo) => (
              <>
                <div
                  onMouseOver={() => setDeleteNo([questionNo, radioNo])}
                  onMouseLeave={() => setDeleteNo([-1, -1])}
                >
                  {((question.optionGroup.length <= 2 || !(deleteNo[0] === questionNo && deleteNo[1] === radioNo)) && (
                    <Radio
                      isChecked
                      isDisabled
                      style={{ cursor: question.optionGroup.length <= 2 ? 'auto' : 'pointer', marginTop: 5, margin: 8 }}
                    />
                  )) || (
                    <IconButton
                      onClick={() => {
                        const temp = { ...template };
                        temp.questions[questionNo].optionGroup.splice(radioNo, 1);
                        setTemplate(temp);
                      }}
                      icon={<BsFillTrashFill />}
                      size="sm"
                      style={{
                        color: '#FEB2B2', fontSize: 15, margin: 0, backgroundColor: 'rgb(0, 0, 0, 0)', boxShadow: 'none',
                      }}
                    />
                  )}
                </div>
                <Input
                  variant="unstyled"
                  placeholder="Option"
                  value={radio}
                  onChange={(e) => {
                    const temp = { ...template };
                    temp.questions[questionNo].optionGroup[radioNo] = e.target.value;
                    updateTemplate(temp.questions[questionNo].optionGroup, questionNo, 'optionGroup');
                  }}
                  style={{ marginLeft: 0 }}
                  width={`${(question.optionGroup[radioNo].length + (question.optionGroup[radioNo].length <= 6 ? (9 - question.optionGroup[radioNo].length) : 3)) * 7}px`}
                />
              </>
            ))}
            <IconButton
              onClick={() => updateTemplate([...template.questions[questionNo].optionGroup, ''], questionNo, 'optionGroup')}
              icon={<BsPlusCircle />}
              style={{ margin: 0, backgroundColor: 'rgb(0, 0, 0, 0)', boxShadow: 'none' }}
            />
          </HStack>
        </RadioGroup>
      )}
      {question.type === 'slider' && (
        <>
          <Flex>
            <Input
              variant="unstyled"
              size="md"
              placeholder="Minimum"
              value={question.sliderGroup[0]}
              onChange={(e) => {
                const temp = { ...template };
                temp.questions[questionNo].sliderGroup[0] = e.target.value;
                updateTemplate(temp.questions[questionNo].sliderGroup, questionNo, 'sliderGroup');
              }}
            />
            <Spacer />
            <Input
              variant="unstyled"
              placeholder="Average"
              textAlign="center"
              size="md"
              value={question.sliderGroup[1]}
              onChange={(e) => {
                const temp = { ...template };
                temp.questions[questionNo].sliderGroup[1] = e.target.value;
                updateTemplate(temp.questions[questionNo].sliderGroup, questionNo, 'sliderGroup');
              }}
            />
            <Spacer />
            <Input
              size="md"
              textAlign="right"
              variant="unstyled"
              placeholder="Maximum"
              value={question.sliderGroup[2]}
              onChange={(e) => {
                const temp = { ...template };
                temp.questions[questionNo].sliderGroup[2] = e.target.value;
                updateTemplate(temp.questions[questionNo].sliderGroup, questionNo, 'sliderGroup');
              }}
            />
          </Flex>
          <Slider isDisabled defaultValue={50}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </>
      )}
      {question.type === 'checkbox' && (
        <HStack spacing="24px">
          {question.optionGroup.map((checkbox, checkboxNo) => (
            <>
              <div
                onMouseOver={() => setDeleteNo([questionNo, checkboxNo])}
                onMouseLeave={() => setDeleteNo([-1, -1])}
              >
                {((question.optionGroup.length <= 1 || !(deleteNo[0] === questionNo && deleteNo[1] === checkboxNo)) && (
                  <Checkbox
                    defaultIsChecked
                    isDisabled
                    style={{ cursor: question.optionGroup.length <= 1 ? 'auto' : 'pointer', marginTop: 5, margin: 8 }}
                  />
                )) || (
                  <IconButton
                    onClick={() => {
                      const temp = { ...template };
                      temp.questions[questionNo].optionGroup.splice(checkboxNo, 1);
                      setTemplate(temp);
                    }}
                    icon={<BsFillTrashFill />}
                    size="sm"
                    style={{
                      color: '#FEB2B2', fontSize: 15, margin: 0, backgroundColor: 'rgb(0, 0, 0, 0)', boxShadow: 'none',
                    }}
                  />
                )}
              </div>
              <Input
                variant="unstyled"
                placeholder="Option"
                value={checkbox}
                onChange={(e) => {
                  const temp = { ...template };
                  temp.questions[questionNo].optionGroup[checkboxNo] = e.target.value;
                  updateTemplate(temp.questions[questionNo].optionGroup, questionNo, 'optionGroup');
                }}
                style={{ marginLeft: 0 }}
                width={`${(question.optionGroup[checkboxNo].length + (question.optionGroup[checkboxNo].length <= 6 ? (9 - question.optionGroup[checkboxNo].length) : 3)) * 7}px`}
              />
            </>
          ))}
          <IconButton
            onClick={() => updateTemplate([...template.questions[questionNo].optionGroup, ''], questionNo, 'optionGroup')}
            icon={<BsPlusSquare />}
            style={{ margin: 0, backgroundColor: 'rgb(0, 0, 0, 0)', boxShadow: 'none' }}
          />
        </HStack>
      )}
      <FormHelperText>
        <Input
          variant="unstyled"
          placeholder="Helper Text"
          value={question.helper}
          onChange={(e) => updateTemplate(e.target.value, questionNo, 'helper')}
        />
      </FormHelperText>
    </FormControl>
  );
}
