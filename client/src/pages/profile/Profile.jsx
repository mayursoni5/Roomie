import { useAppStore } from "@/store";

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();

  return <div>Profile</div>;
};

export default Profile;
