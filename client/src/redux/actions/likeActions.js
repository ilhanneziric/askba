import axios from 'axios';
import { SERVERURL } from '../../serverURL';
import { getQuestion } from './questionActions';

export const like = (isDislike, answer = null) => async(dispatch, getState) => {
    try {
        const {userId, question} = getState();
        var like = null;
        answer === null ? 
        like = question.Likes.find((l) => l.userId === userId && l.isDislike === !isDislike) : 
        like = answer.Likes.find((l) => l.userId === userId && l.isDislike === !isDislike);

        if(like){
            dispatch(deleteLike(answer));
        }
        const body = {
            userId: userId,
            isDislike: isDislike
        }
        answer === null ? body.questionId = question.id : body.answerId = answer.id;
        await axios.post(`${SERVERURL}/api/like`, body,{
            headers: {token: localStorage.token}
        });
        dispatch(getQuestion(question.id));
    } catch (err) {
        console.log(err);
    }
}

export const deleteLike = (answer = null) => async(dispatch, getState) => {
    try {
        const {userId, question} = getState();
        var like = null;
        answer === null ? 
        like = question.Likes.find((l) => l.userId === userId) : 
        like = answer.Likes.find((l) => l.userId === userId);

        await axios.delete(`${SERVERURL}/api/like/${like.id}`, {
            headers: {token: localStorage.token}
        });

        dispatch(getQuestion(question.id));
    } catch (err) {
        console.log(err);
    }
}