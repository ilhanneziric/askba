import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications } from '../redux/actions/notificationsActions'
import '../styles/profile.scss'


const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  return (
    <>
    {
      notifications !== undefined && notifications?.length !== 0 ? 
        (notifications?.map((n) => (<div key={n.id} className="notificationContainer">
          {n.seen === false ? <div style={{fontWeight:'900'}}>{n.text}</div> : <div style={{fontWeight:'100'}}>{n.text}</div>}
        </div>))) 
        : 
        <p>You have no notifications!</p>
    }
    </>
  )
}

export default Notifications