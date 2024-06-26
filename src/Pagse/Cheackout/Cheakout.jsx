import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provaider/AuthProvider";


const Cheakout = () => {
    const service = useLoaderData();
    console.log(service);
    const { title, _id,price,img} = service;
    const {user} = useContext(AuthContext)
 
    const handleBookService = event =>{
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }

        console.log(booking);


        fetch('http://localhost:5000/bookings',{
         
          method: 'POST',
          headers: {
            
             'content-type': 'application/json'
          },
          body:JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                alert('service succesfully')
            }
        })

    }




    return (
        <div>
            <h2 className="text-3xl font-bold text-center">Book Service {title}</h2>
            <form onSubmit={handleBookService} className="card-body">
                <div className="grid  grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" defaultValue={user?. displayName} name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" defaultValue={user?.email} name="email"  className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due amount</span>
                        </label>
                        <input type="text" defaultValue={'$'+  price} className="input input-bordered" required />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn bg-[#FF3811] btn-block" type="submit" value="oder confrom" />
                </div>
            </form>
        </div>
    );
};

export default Cheakout;