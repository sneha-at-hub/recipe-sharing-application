import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const fetchUserData = async () => {
  const token = localStorage.getItem('app_access_token');
  if (token) {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to fetch user data');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }
  return null;
};

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData();
      setUser(data);
    };

    getUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Last Login: {user.last_login}</p>
    </div>
  );
};

export default UserProfile;
