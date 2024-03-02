import React, {useState, useEffect} from 'react'
import axios from 'axios'
const Events = () => {
    const [newEvent, setNewEvent] = useState(false)
    const [event, setEvent] = useState({
        registrations:[]
    })
    const [allEvents, setAllEvents] = useState([])
    const [tempAllEvents, setTempAllEvents] = useState([])
    
    const [user, setUser] = useState({})
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const { user } = JSON.parse(storedUser);
          setUser(user)

          let setNewEvent = {
            ...event,
            registrations: [...event.registrations, user._id],
          };

          setEvent(setNewEvent)

          
          console.log('User information from local storage:', { event });
        }
        
    }, []);



    const getMyEvents = () =>{
        const myProducts = allEvents.filter(itm=>(itm.registraions.contain(user._id)));
        setAllEvents(myProducts)
    }

    
    

    const getAllEvents =async()=>{
        await axios.get(`http://localhost:5000/events/`, event, {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => {
                  console.log(response.data)
                  setAllEvents(response.data)
                  setTempAllEvents(response.data)
              })
              .catch(error => {
                console.error('Error logging in', error);
        })
    }

    useEffect(() => {
        getAllEvents()
        
    }, []);




    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setEvent((prev) => ({
          ...prev,
          [name]: value,
        }));
    }




    const handleSave = async()=>{
        console.log(event)



        await axios.post(`http://localhost:5000/events`, event, {
            headers: {
                'Content-Type': 'application/json',
              },
        }).then(response => {
                console.log(response.data)
            })
            .catch(error => {
              console.error('Error logging in', error);
        })


        setNewEvent(false)
    }



    const handleRegistration = async (eventId, userId) => {
        try {
          const response = await axios.post(`http://localhost:5000/events/${eventId}/register`, { userId });
          console.log('Registration successful:', response.data);
          
        } catch (error) {
          console.error('Error registering user for event:', error.response.data.message);
          // Handle errors appropriately
        }
      };


      const filterEventsByType = (type) => {
        // Filter events based on selected types
        // getAllEvents()
        const filtered = allEvents.filter((et) => et.type===type);
        setTempAllEvents(filtered);
      };





  return (
    <div className="marketplace">
        <h2>Events</h2>
        <div className="marktet-top-nav">
            <button className='market-btn' onClick={()=>setNewEvent(true)}>New</button>
            <button className='market-btn' onClick={()=>{filterEventsByType('gardening')}}>Gardening</button>
            <button className='market-btn' onClick={()=>{filterEventsByType('workshop')}}>Workshops</button>
            <button className='market-btn' onClick={()=>{filterEventsByType('volunteering')}}>Volunteering</button>
            <button className='market-btn' onClick={()=>{filterEventsByType('community-gathering')}}>Community Gathering</button>
            <button className='market-btn' onClick={()=>{getAllEvents()}}>All</button>
        </div>
        
        <div className='market-content'>
            {
                tempAllEvents.map((itm)=>(
                    <div className='event-card'>
                        <div>
                            <div className='pr-title'>Title: {itm.name}</div>
                            <div className='et-itm'>Desc: {itm.description}</div>
                            <div className='et-itm'>Type: {itm.type}</div>
                        </div>
                        <div className='et-rt'>
                            <div className='et-date'>Date:{itm.date}</div>
                            {itm.registrations.includes(user._id)?(
                                <button className="et-btn">Delete</button>
                            ):(
                                <button className='et-btn' onClick={()=>handleRegistration(itm._id, user._id)}>Register</button>
                            )}
                                
                                

                            
                        </div>
                        
                        
                        {
                            (user._id === itm.userId) && <div className='pr-delete'>Delete</div>
                        }
                        
                        
                    </div>
                ))
            }
        </div>

        {newEvent&& <div className='new-product'>
            <h2>Add Item Details</h2>
            <div className='new-product-detail'>
                <label>Name:</label>
                <input type="text" name="name" className="new-product-val" value={event.name} onChange={handleInputChange} />
                <label>Description:</label>
                <input type="text" name="description" className="new-product-val" value={event.description} onChange={handleInputChange} />
                <label>Date:</label>
                <input type="date" name="date" className="new-product-val" value={event.date} onChange={handleInputChange} />
                <label>Type:</label>
                <select type="number" name="type" className="new-product-val" value={event.price} onChange={handleInputChange}>
                    <option value=''>Select</option>
                    <option value='gardening'>Gardening</option>
                    <option value='workshop'>Workshop</option>
                    <option value='volunteering'>Volunteering</option>
                    <option value='community-gathering'>Community Gathering</option>
                </select>
                
            </div>         
            <div>
                <button onClick={()=>handleSave()} className='market-btn' style={{marginTop:'50px'}}>Save</button>
                <button onClick={()=>setNewEvent(false)} className='market-btn' style={{marginLeft:'50px'}}>Cancel</button>
            </div>
        </div>}
    </div>
  )
}

export default Events