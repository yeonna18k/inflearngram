"use client";

import { Button } from "@material-tailwind/react";
import Person from "./Person";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import { selectedUserIdState, selectedUserIndexState } from "utils/recoil/atom";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "actions/chatActions";

export default function ChatScreen() {
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);

  const selectedUserQuery = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });

  return selectedUserQuery.data !== null ? (
    <div className="w-full h-screen flex flex-col">
      {/* Active 유저 영역 */}
      <Person
        index={selectedUserIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split("@")[0]}
        onChatScreen={true}
        onlineAt={new Date().toISOString()}
        userId={selectedUserQuery.data?.id}
      />
      {/* 채팅 영역 */}
      <div className="w-full flex-1 flex flex-col p-4 gap-2">
        <Message isFromMe={true} message={"안녕하세요 반갑습니다"} />
        <Message isFromMe={false} message={"안녕하세요 저도 반갑습니다"} />
        <Message isFromMe={true} message={"점심 드셨나요?"} />
        <Message isFromMe={true} message={"저는 이제 곧 먹으려구요"} />
      </div>
      {/* 채팅창 영역 */}
      <div className="flex">
        <input
          className="w-full p-3 border-2 border-light-blue-600"
          placeholder="메시지를 입력하세요"
        />
        <button className="min-w-20 p-3 bg-light-blue-600 text-white">
          <span>전송</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
