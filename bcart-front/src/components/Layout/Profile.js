import { useContext } from "react"
import styled from "styled-components";
import ProfileContext from "../Context/ProfileContext"

const ProfileBox = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
`;

export default function Profile () {
    const { data } = useContext(ProfileContext)
    return <>
        {data && 
            <ProfileBox>
                <img src={data.profile} height={100} width={100}></img>
                <p>Name: {data.firstname} {data.lastname}</p>
                <p>Email: {data.email}</p>
                <p>Username: {data.username}</p>
                <p>Organization: {data.organization}</p>
                <p>DOB: {data.dob}</p>
            </ProfileBox>
        }
    </>
}