/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiLogOut } from "react-icons/fi";

import * as S from "./styles";
import { GET_ROOMS } from "../../graphql/queries";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { stagger } from "../../animations/stagger";
import { fade, fadeLeft } from "../../animations/fade";

interface RoomProps {
  id: string;
  name: string;
  status: string;
  company: string;
}

const Home: React.FC = () => {
  const { data } = useQuery(GET_ROOMS);

  const [rooms, setRooms] = useState<RoomProps[]>([]);

  useEffect(() => {
    if (data) {
      setRooms(data.rooms);
    }
  }, [data]);

  const { profile, signOut } = useAuth();
  const { setTitle, title } = useTheme();

  useEffect(() => {
    console.log(title);
  }, [title]);

  useEffect(() => {
    if (profile?.user.company === "pepsi") {
      setTitle("pepsi");
    } else {
      setTitle("coke");
    }
  }, []);

  return (
    <S.Container initial="initial" animate="animate" variants={fade}>
      <div
        style={{ display: "flex", flex: 1, justifyContent: "space-between" }}
      >
        <div>
          <S.Title>
            Hello, <span>{profile?.user.name}</span>!
          </S.Title>
          <Link to="/appointments">
            <h2 style={{ color: "#000", textDecoration: "underline" }}>
              Appointments
            </h2>
          </Link>
        </div>

        <button style={{ backgroundColor: "transparent" }} onClick={signOut}>
          <FiLogOut size={42} />
        </button>
      </div>

      <div style={{ marginTop: 50 }}>
        <h2>{profile?.user.company}'s rooms:</h2>

        <S.RoomsContent variants={stagger}>
          {rooms &&
            rooms.map((room) => (
              <>
                {room.company === profile?.user.company && (
                  <Link
                    style={{ display: "flex", margin: 20 }}
                    to={`/room/${room.id}`}
                  >
                    <S.Chip variants={fadeLeft}>
                      <h3>{room.name}</h3>
                      <div style={{ alignSelf: "flex-end" }}>
                        <FiArrowRight size={32} />
                      </div>
                    </S.Chip>
                  </Link>
                )}
              </>
            ))}
        </S.RoomsContent>
      </div>
    </S.Container>
  );
};

export default Home;
