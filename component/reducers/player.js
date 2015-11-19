import { REQUEST_PLAY, REQUEST_PAUSE } from '../actions/player';

export default function player(state = 0, action) {
	switch (action.type) {
		case REQUEST_PLAY:
			
		case REQUEST_PAUSE:
		default:
			return state;
	}
}
