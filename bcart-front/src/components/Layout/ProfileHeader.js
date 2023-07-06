import { useContext } from "react"
import styled from "styled-components";
import ProfileContext from "../Context/ProfileContext"

const ProfileHeaderBox = styled.div`
    border-radius: 25px;
    height: 50px;
    width: 50px;
    display: block;
    position: absolute;
    right: 25px;
`;

const Image = styled.img`
    border-radius: 25px;
`;

export default function ProfileHeader () {
    const { data } = useContext(ProfileContext)
    return <>
        {data && 
            <ProfileHeaderBox>
                <Image src={data.profile} height={50} width={50}></Image>
            </ProfileHeaderBox>
        }
    </>
}