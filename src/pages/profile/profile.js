import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Profile = () => {

    const [user, setUser] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState({ ...user });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const { user } = JSON.parse(storedUser);
          setUser(user)
          setEditedUser(user)
          console.log('User information from local storage:', { user });
        }
        
    }, []);


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      };


      const handleSaveChanges = async(e)=>{
        
        await axios.post(`http://localhost:5000/update-user/${user._id}`, {updatedUser: editedUser}, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
                console.log(response.data)
                if (response.data.user){
                    localStorage.setItem('user', JSON.stringify({ user: response.data.user}));
                    window.location.replace('./profile')
                }

            })
            .catch(error => {
              console.error('Error logging in', error);
        })

        
        
        setIsEditing(false)

      }

  return (
    <div className="profile">
        <div className='profile-content' >
            <h2>My Profile</h2>
            <div >
                {isEditing ? (
                    <div className="profile-mid">
                        <label>Name:</label>
                        <input type="text" name="name" className="profile-edit-input" value={editedUser.name} onChange={handleInputChange} />
                        <label>Email:</label>
                        <input type="email" name="email" className="profile-edit-input" value={editedUser.email} onChange={handleInputChange} />
                        <label>Location:</label>
                        <input type="text" name="location" className="profile-edit-input" value={editedUser.location} onChange={handleInputChange} />
                        <label>Experience:</label>
                        <input type="text" name="experience" className="profile-edit-input" value={editedUser.experience} onChange={handleInputChange} />
                        
                        
                        <button onClick={handleSaveChanges} className='profile-btn'>Save Changes</button>
                    </div>
                ) : (
                    <div className="profile-mid">
                        <div className='profile-itm'>
                            <div className='itm-title'>Name:</div>
                            <div className='itm-dtl'>{user.name}</div>
                        </div>
                        <div className='profile-itm'>
                            <div className='itm-title'>Email:</div>
                            <div className='itm-dtl'>{user.email}</div>
                        </div>
                        <div className='profile-itm'>
                            <div className='itm-title'>Location:</div>
                            <div className='itm-dtl'>{user.location}</div>
                        </div>
                        <div className='profile-itm'>
                            <div className='itm-title'>Role:</div>
                            <div className='itm-dtl'>{user.role}</div>
                        </div>
                        <div className='profile-itm'>
                            <div className='itm-title'>Experience:</div>
                            <div className='itm-dtl'>{user.experience}</div>
                        </div>
                        
                        <button onClick={()=>setIsEditing(true)} className="profile-btn">Edit</button>
                    </div>
                )}
            </div>
        </div>
        
        
    </div>
  )
}

export default Profile