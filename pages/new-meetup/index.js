import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import axios from 'axios';

function NewMeetupPage() {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    console.log(enteredMeetupData);

    const response = await axios.post('/api/new-meetup', enteredMeetupData);
    // console.log(response.data);
    router.push('/');
  };
  return (
    <>
      <Head>
        <title>Add new Meetups</title>
        <meta name="description" content="Add your meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetupPage;
