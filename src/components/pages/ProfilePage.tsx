import { Achievements } from "../achievements/Achievements";

export function ProfilePage() {
  return (
    <div>
      <div className="text-white">
        Welcome to the profile page :)
        <div>
          Note that loading the achievements may take a while depending on your
          amount of games, please be patient.
        </div>
      </div>
      <Achievements />
    </div>
  );
}
