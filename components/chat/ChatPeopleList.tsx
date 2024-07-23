"use client";

import Person from "./Person";
import { useRecoilState } from "recoil";
import { selectedIndexState } from "utils/recoil/atom";

export default function ChatPeopleList() {
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);

  return (
    <div className="w-60 h-screen flex flex-col bg-gray-50 ">
      <Person
        onClick={() => setSelectedIndex(0)}
        index={1}
        isActive={selectedIndex === 0}
        name={"NaYeon"}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={"yeonna18k"}
      />
      <Person
        onClick={() => setSelectedIndex(1)}
        index={2}
        isActive={selectedIndex === 1}
        name={"NangKong"}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={"cynthia9298"}
      />
    </div>
  );
}
