import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications } from '../redux/actions/notificationsActions'
import '../styles/profile.scss'
import '../styles/questionCard.scss'


const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);
  return (
    <>
    {
      notifications !== undefined && notifications?.length !== 0 ? 
        (notifications?.map((n) => (<div key={n.id} className="cardNotification">
          {n.seen === false ? <div className='cartTitle' style={{fontWeight:'900'}}>{n.text}</div> : <div className='cartTitle' style={{fontWeight:'100'}}>{n.text}</div>}
        </div>))) 
        : 
        <p>You have no notifications!</p>
    }
    </>
  )
}

export default Notifications