import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provaider/AuthProvider";
import BookingsRow from "./BookingsRow";
import axios from "axios";


const Booking = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`

    useEffect(() => {

       axios.get(url, {withCredentials: true})
       .then(res =>{
        setBookings(res.data)
       })
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
    }, [url])

       
    const handleDelete = id => {
        const proceed = confirm('Are you sure want to delete');
        if(proceed){
           fetch(`http://localhost:5000/bookings/${id}`, {
               method: 'DELETE',

           })
           .then(res => res.json())
           .then(data =>{
               console.log(data);
               if(data.deleteCount > 0){
                   alert('deleted Successfully');
                   const remaining = bookings.filter(booking => booking._id !== id);
                   setBookings(remaining);
               }
           })

        }
   }
     
    const handleConfrim = id =>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method:'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify({status: 'confirm '})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                //update state
                const remaining = bookings.filter(booking => booking._id !== id);
                const updated = bookings.find(booking => booking._id === id);
                updated.status= 'confrim'
                const newBookings = [updated, ...remaining]
                setBookings(newBookings)
            }
        })
    }


    return (
        <div>

            <h2 className="text-3xl font-bold text-center">Your bookings {bookings.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        bookings.map(booking => <BookingsRow
                        key={booking._id}
                        booking={booking}
                        handleDelete={handleDelete}
                        handleConfrim={handleConfrim}
                        ></BookingsRow>)
                       }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Booking;