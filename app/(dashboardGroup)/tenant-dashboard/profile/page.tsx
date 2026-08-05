import { getMe } from "@/service/getMe";
import ProfileView from "./_components/profile-view";

export default async function ProfilePage() {
  const response = await getMe();
  const userData = response?.data; // Contains user + nested profile
// console.log(userData);

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Account Profile</h1>
      <ProfileView initialData={userData} />
    </div>
  );
}