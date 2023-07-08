import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import Roomster from '../../../API/config.jsx'


const ReservationDashboard = () => {

    const [apartments, setApartments] = useState([]);
    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);

    const { user } = useSelector((state) => state.user);


    const getUserApartments = async () => {
        if (user._id !== "") {
            try {
                const { data } = await Roomster.get(`user/${user._id}/apartments`);
                setApartments(data);
            } catch (error) {
                console.log(error);
            }
        }
    };


    useEffect(() => {
        getUserApartments();
    }, []);



    useEffect(() => {
        const groups = apartments?.map((apartment) => ({
            id: apartment._id,
            title: apartment.title,
        }));
        setGroups(groups);
        const items = apartments?.flatMap((apartment, index) => {
            const displayReservations = apartment.reservationsArr?.map((reservation) => {
                return {
                    id: reservation.reservationId,
                    group: apartment._id,
                    title: reservation.reservationId,
                    start_time: moment(reservation.startDate),
                    end_time: moment(reservation.endDate)
                }
            })
            return displayReservations
        });
        setItems(items)
    }, [apartments])

    return (
        <div>
            <Timeline
                groups={groups}
                items={items}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
            />
        </div>
    )
}

export default ReservationDashboard