import React from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    address: 'alwar',
  },
  {
    id: 'm2',
    title: 'A second Meetup',
    image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    address: 'Alwar',
  },
  {
    id: 'm3',
    title: 'A Third Meetup',
    image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    address: 'alwar,shalimar',
  },
];

function HomePage(props) {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getServerSideProps() {
  //fetch data from api
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

// export async function getStaticProps() {
//   //fetch data from api
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     revalidate: 3,
//   };
// }
export default HomePage;
