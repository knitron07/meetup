import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
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
