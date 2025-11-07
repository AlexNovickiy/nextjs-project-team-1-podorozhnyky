import React from 'react';

type TravellerInfoProps = { travellerId?: string };

const TravellerInfo: React.FC<TravellerInfoProps> = ({ travellerId }) => {
  return (
    <section aria-label="traveller info">
      <h2>Мандрівник {travellerId ?? ''}</h2>
      <p>Коротка інформація про мандрівника.</p>
    </section>
  );
};

export default TravellerInfo;
