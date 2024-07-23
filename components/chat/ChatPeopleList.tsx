"use client";

import { useQuery } from "@tanstack/react-query";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { selectedUserIdState, selectedUserIndexState } from "utils/recoil/atom";
import { getAllUsers } from "actions/chatActions";

export default function ChatPeopleList({ loggedInUser }) {
  const [selectedUserId, setSelectedUserId] =
    useRecoilState(selectedUserIdState);
  const [selectedUserIndex, setSelectedUserIndex] = useRecoilState(
    selectedUserIndexState
  );
  // getAllUsers
  const getAllUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const allUsers = await getAllUsers();
      return allUsers.filter((e) => e.id !== loggedInUser.id);
    },
  });

  return (
    <div className="w-60 h-screen flex flex-col bg-gray-50 ">
      {getAllUsersQuery.data?.map((user, index) => (
        <Person
          onClick={() => {
            setSelectedUserId(user.id);
            setSelectedUserIndex(index + 1);
          }}
          index={index + 1}
          isActive={selectedUserId === user.id}
          name={user.email.split("@")[0]}
          onChatScreen={false}
          onlineAt={new Date().toISOString()}
          userId={user.id}
        />
      ))}
      {/* <Person
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
      /> */}
    </div>
  );
}
