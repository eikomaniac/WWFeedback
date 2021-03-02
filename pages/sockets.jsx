import { useState, useEffect } from 'react';
import { useList } from "@roomservice/react";
import axios from 'axios';
import {
  Button, Text, Center, ButtonGroup, PinInput, PinInputField, HStack, useToast, Input, Box, Container
} from '@chakra-ui/react';
import { IoCreateOutline, IoEnterOutline } from 'react-icons/io5';
import { AiOutlineLeft } from 'react-icons/ai';
import Layout from '../components/Layout';
import Attendee from '../components/Attendee';
import Host from '../components/Host';

export default function Home() {
  const [pageView, setPageView] = useState('attendee');
  const [text, setText] = useState("");
  const [feedback, list] = useList("myroom", "feedback");

  function onCheckOff(i) {
    if (!list) return;
    list.delete(i);
  }

  function onEnterPress() {
    if (!list) return;
    list.push(text);
    setText("");
  }

  return (
      <div className="container" style={{ display: 'grid', placeItems: 'center', height: '90vh' }}>
        {pageView === 'attendee' && <Attendee setPageView={setPageView} />}
        {pageView === 'host' && <Host setPageView={setPageView} />}
      </div>
  );
}
