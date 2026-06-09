import { Achievements } from "../achievements/Achievements";

type ProfilePageProps = {
  userSteamId: string;
};

export function ProfilePage({ userSteamId }: ProfilePageProps) {
  return (
    <div>
      <div className="text-white">Welcome to the profile page :)</div>
      <Achievements userSteamId={userSteamId} />
    </div>
  );
}
