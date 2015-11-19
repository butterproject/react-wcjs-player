import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Player from '../';
import * as PlayerActions from '../actions/player';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PlayerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
