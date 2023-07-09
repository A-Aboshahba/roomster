import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import Roomster from '../../../API/config.jsx';
import { styled } from '@mui/material/styles';

const ReservationDashboard = () => {
    const [apartments, setApartments] = useState([]);
    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);

    const { user } = useSelector((state) => state.user);

    const getUserApartments = async () => {
        if (user._id !== '') {
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
    }, [user._id]);

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
                    end_time: moment(reservation.endDate),
                };
            });
            return displayReservations;
        });
        setItems(items);
    }, [apartments,user._id]);

    return (
        <div>
            <table className="table table-bordered border border-1 border-dark collaps" style={{background:'#ddf4cd'}} >
                <thead className="thead-dark">
                    <tr>
                        <th className='h4 text-center text-white ' style={{background:'rgb(97 147 100)'}} colSpan={Math.floor(items.length / 2 -1)}>Apartments</th>
                        <th className='h4 text-center text-white ' style={{background:'rgb(97 147 100)'}} colSpan={Math.floor(items.length / 2)}>Reservations</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr key={group.id} style={{marginBottom: '10px'}}>
                            <td className='w-content  table-warning border-1 border-dark w-25 text-center p-3 '>{group.title}</td>
                            {items.map((item) =>
                                item.group === group.id && (
                                    <td className="table-success border border-1 border-dark text-center p-3"  key={`${group.id}-${item.id}`}>
                                        <div className='centerItem h-100' >
                                            {moment(item.start_time).format('MMM D')} -{' '}
                                            {moment(item.end_time).format('MMM D, YYYY')}
                                        </div>
                                    </td>
                                )

                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationDashboard;