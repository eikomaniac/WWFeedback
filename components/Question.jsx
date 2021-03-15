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
        {question.label}
      </Flex>
      {question.type === 'input' && (
        <Input
          style={{ color: '#a9a9a9' }}
          placeholder={question.placeholder}
          value={question.answer}
          onChange={(e) => updateTemplate(e.target.value, questionNo, 'answer')}
        />
      )}
      {question.type === 'radio' && (
        <RadioGroup value={question.answer} onChange={(val) => { updateTemplate(val, questionNo, 'answer'); }}>
          <HStack spacing="24px">
            {question.optionGroup.map((radio, radioNo) => (
              <>
                <div
                  onMouseOver={() => setDeleteNo([questionNo, radioNo])}
                  onMouseLeave={() => setDeleteNo([-1, -1])}
                >
                  {((question.optionGroup.length <= 2 || !(deleteNo[0] === questionNo && deleteNo[1] === radioNo)) && (
                    <Radio
                      value={question.optionGroup[radioNo]}
                      style={{ cursor: question.optionGroup.length <= 2 ? 'auto' : 'pointer', marginTop: 5, margin: 8 }}
                    >
                      {question.optionGroup[radioNo]}
                    </Radio>
                  ))}
                </div>
              </>
            ))}
          </HStack>
        </RadioGroup>
      )}
      {question.type === 'slider' && (
        <>
          <Flex>
            {question.sliderGroup[0]}
            <Spacer />
            {question.sliderGroup[1]}
            <Spacer />
            {question.sliderGroup[2]}
          </Flex>
          <Slider
            onChange={(val) => {
              if (val > 66) {
                updateTemplate(question.sliderGroup[2], questionNo, 'answer');
              } else if (val > 33 && val <= 66) {
                updateTemplate(question.sliderGroup[1], questionNo, 'answer');
              } else {
                updateTemplate(question.sliderGroup[0], questionNo, 'answer');
              }
            }}
            defaultValue={50}
          >
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
        {question.helper}
      </FormHelperText>
    </FormControl>
  );
}
