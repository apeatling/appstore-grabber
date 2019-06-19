import axios from 'axios';
import * as constants from '../constants.js';

export default axios.create({
	baseURL: constants.URLS.API_URL
});