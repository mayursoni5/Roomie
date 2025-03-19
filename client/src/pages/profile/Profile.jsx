import { useAppStore } from "@/store";

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();

  return <div className="color-red-500">Profile</div>;
};

export default Profile;
