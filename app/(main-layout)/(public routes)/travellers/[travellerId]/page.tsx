import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

export type TravellerPageProps = { params: { travellerId: string } };

export default function TravellerPage({ params }: TravellerPageProps) {
  return (
    <MessageNoStories
      text="Цей користувач ще не публікував історій"
      buttonText="Назад до історій"
      route="/stories"
    />
  );
}
