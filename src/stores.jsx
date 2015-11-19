import alt from './alt';

import PlayerActions from './actions/player';
import PlayState from './playstate';

class PlayStore {
    constructor() {
        this.playState = PlayState.PAUSED;

        this.bindListeners({
            updatePlayState: PlayerActions.updatePlayState,
        })
    }

    updatePlayState(newState) {
        if (PlayState[newState] !== undefined) {
            this.playState = PlayState[newState]
        }
    }
}

export default alt.createStore(PlayStore, 'PlayStore')
