import { MongoClient } from 'mongodb';
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

// export async function getServerSideProps() {
//   const client = await MongoClient.connect(
//     `mongodb+srv://samardeep:${process.env.MONGODBPASS}@cluster0.oubka.mongodb.net/meetUpDB?retryWrites=true&w=majority`,
//   );

//   const db = client.db();
//   const meetupsCollection = db.collection('meetUpsCollection');
//   const allMeetups = await meetupsCollection.find().toArray();
//   client.close();
//   return {
//     props: {
//       meetups: allMeetups.map((meetup) => ({
//         title: meetup.title,
//         image: meetup.image,
//         address: meetup.address,
//         id: meetup._id.toString(),
//       })),
//     },
//   };
// }

export async function getStaticProps() {
  //fetch data from api
  const client = await MongoClient.connect(
    `mongodb+srv://samardeep:${process.env.MONGODBPASS}@cluster0.oubka.mongodb.net/meetUpDB?retryWrites=true&w=majority`,
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetUpsCollection');
  const allMeetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: allMeetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3,
  };
}
export default HomePage;
