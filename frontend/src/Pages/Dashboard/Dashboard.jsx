import React, { useEffect } from 'react'

const Dashboard = () => {
    useEffect(() => {
                  document.title = `Dashboard| ${import.meta.env.VITE_APP_NAME}`;
        }, []);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard