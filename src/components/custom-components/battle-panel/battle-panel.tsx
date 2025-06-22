"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Plus, Trash } from "lucide-react";
import { motion } from "motion/react";

export const BattlePanel = () => {
  const [roomID, setRoomID] = useState<string | null>(null);
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Battle Arena
          </CardTitle>
          <CardDescription className="text-indigo-200 text-center">
            Battle 1v1 against your friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          {roomID ? (
            <Stage roomID={roomID} setRoomID={setRoomID} />
          ) : (
            <motion.div className="flex gap-6 items-center justify-center">
              <CreateRoomButton setRoomID={setRoomID} />
              <JoinRoomButton setRoomID={setRoomID} />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

const Stage = ({
  roomID,
  setRoomID,
}: {
  roomID?: string;
  setRoomID: Dispatch<SetStateAction<string | null>>;
}) => {
  const handleDeleteRoom = async () => {
    const res = await fetch("http://localhost:8080/ws/delete-room", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomID: roomID }),
    });

    const response = await res.json();
    setRoomID(null);

    console.log(response);
  };
  return (
    <div className="text-white text-center space-y-2">
      <p className="text-lg font-bold">Room Created!</p>
      <p className="text-indigo-300">Room ID: {roomID}</p>

      <button
        onClick={handleDeleteRoom}
        className="bg-white/20 rounded-lg flex flex-col p-3 items-center justify-center hover:bg-white/30 transition-all duration-200 group"
      >
        <Trash className="text-red-400 mb-2 group-hover:scale-110 transition-transform" />
        <p className="font-bold text-white">Join Room</p>
      </button>
    </div>
  );
};
interface BattleButtonProps {
  setRoomID: Dispatch<SetStateAction<string | null>>;
}

interface JoinRoomButtonProps extends BattleButtonProps { }

const JoinRoomButton = ({ setRoomID }: JoinRoomButtonProps) => {
  return (
    <button className="w-full bg-white/20 rounded-lg flex flex-col p-3 items-center justify-center hover:bg-white/30 transition-all duration-200 group">
      <Users className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
      <p className="font-bold text-white">Join Room</p>
    </button>
  );
};

interface CreateRoomButtonProps extends BattleButtonProps { }

const CreateRoomButton = ({ setRoomID }: CreateRoomButtonProps) => {
  const handleCreate = async () => {
    const res = await fetch("http://localhost:8080/ws/create-room");
    const response: { roomID: string } = await res.json();
    setRoomID(response.roomID);
  };

  return (
    <button
      onClick={handleCreate}
      className="w-full bg-white/20 rounded-lg flex flex-col p-3 items-center justify-center hover:bg-white/30 transition-all duration-200 group"
    >
      <Plus className="text-green-400 mb-2 group-hover:scale-110 transition-transform" />
      <p className="font-bold text-white">Create Room</p>
    </button>
  );
};
