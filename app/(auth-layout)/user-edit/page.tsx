import EditProfile from '@/components/EditProfile/EditProfile';
import { fetchCurrentUser } from '@/lib/api/serverApi';
// import mainCss from '@/app/Home.module.css';

export default async function UserEditPage() {
  const currentUser = await fetchCurrentUser();
  console.log('current user:', JSON.stringify(currentUser, null, 2));

  return (
    <div>
      <EditProfile user={currentUser.data.user} />
    </div>
  );
}
