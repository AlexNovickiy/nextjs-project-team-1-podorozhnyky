'use client';

import MessageNoStories from '../../../../components/MessageNoStories/MessageNoStories';

const ProfilePage = () => {
  return (
    <MessageNoStories
      text="Ви ще нічого не публікували, поділіться своєю першою історією!"
      buttonText="Опублікувати історію"
      route="/stories/create"
    />
  );
};

export default ProfilePage;
