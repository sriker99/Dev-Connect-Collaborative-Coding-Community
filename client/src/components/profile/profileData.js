import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const calculateNumOfDays = (date) => {
    const givenDate = new Date(date);
    const currentDate = new Date();

    const timeDifference = currentDate - givenDate;
    const numberOfDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return numberOfDays

}

const ProfileData = () => {
    const { user } = useAuthContext();
    console.log("user in profileData", user)
    return(
        <div>
            <div id = "reputation">
                <h3>Reputation: 0</h3>
            </div>
            <div id = "userJoinedData">
                <h3>User Joined: {calculateNumOfDays(user.joined_date)} days </h3>
            </div>
        </div>
    )
}

export default ProfileData;