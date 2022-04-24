import io from 'socket.io-client';
import { SERVERURL } from './serverURL';

// const ENDPOINT = 'https://askba.herokuapp.com/';
export default io(SERVERURL);