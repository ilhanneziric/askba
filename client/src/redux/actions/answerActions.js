import axios from 'axios';
import { toast } from 'react-toastify';
import { answerValidation } from '../../validations';
import socket from '../../Socket'
import { addNotification } from './notificationsActions';
import { getQuestion } from './questionActions';

export const addAnswer = (answer) => async(dispatch, getState) => {
    const {userId, question} = getState();
    const { error } = answerValidation({text: answer});
    if(error){
        toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
    }else{
      const body = {
        text: answer,
        userId: userId,
        questionId: question.id
      }
      try {
        await axios.post('http://localhost:5000/api/answer', body,{
            headers: {token: localStorage.token}
        });
        toast.success('Answer added successfully!');
        socket.emit('send_notification', question.userId);
        question.User.id !== userId && dispatch(addNotification());
        dispatch(getQuestion(question.id));
      } catch (err) {
        toast.error(err.response.data);
      }
    }
}

export const editAnswer = (answer, id) => async(dispatch, getState) => {
    const {userId, question} = getState();
    const { error } = answerValidation({text: answer});
    if(error){
        toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
    }else{
      const body = {
        text: answer,
        userId: userId,
        questionId: question.id
      }
      try {
        await axios.put(`http://localhost:5000/api/answer/${id}`, body,{
            headers: {token: localStorage.token}
        });
        toast.success('Answer changed successfully!');
        dispatch(getQuestion(question.id));
      } catch (err) {
        toast.error(err.response.data);
      }
    }
}

export const deleteAnswer = (id) => async(dispatch, getState) => {
    try {
        const {question} = getState();
        await axios.delete(`http://localhost:5000/api/answer/${id}`, {
          headers: {token: localStorage.token}
        });
        toast.success('Answer deleted successfully!')
        dispatch(getQuestion(question.id));
      } catch (err) {
        toast.error(err.response.data);
      }
}



