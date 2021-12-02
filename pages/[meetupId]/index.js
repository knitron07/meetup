import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';
function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.title} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
      />
    </>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://samardeep:${process.env.MONGODBPASS}@cluster0.oubka.mongodb.net/meetUpDB?retryWrites=true&w=majority`,
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetUpsCollection');
  const allMeetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: true,
    paths: allMeetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    `mongodb+srv://samardeep:${process.env.MONGODBPASS}@cluster0.oubka.mongodb.net/meetUpDB?retryWrites=true&w=majority`,
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetUpsCollection');
  const SingleMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();
  console.log(SingleMeetup.toString());
  return {
    props: {
      meetupData: {
        id: SingleMeetup._id.toString(),
        image: SingleMeetup.image,
        title: SingleMeetup.title,
        address: SingleMeetup.address,
      },
    },
  };
}

export default MeetupDetails;
