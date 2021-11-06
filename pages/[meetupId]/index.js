import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
function MeetupDetails() {
  return (
    <div>
      <MeetupDetail
        image='https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
        title='first meetup'
        address='alwar'
      />
    </div>
  );
}
export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  return {
    props: {
      meetupData: {
        id: meetupId,
        image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
        title: 'first meetup',
        address: 'alwar',
      },
    },
  };
}

export default MeetupDetails;
