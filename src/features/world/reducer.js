import maps  from '../../data/maps';

const initialState = {
  currentMap: '1_1',
  gameOver: false,
  gameStart: false,
  paused: false,
  inventory: false,
  turn: 0,
  sound: true
};

const worldReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'SET_SOUND':
      // turn on or off game sounds
      newState.sound = action.payload.sound;
      return newState;

    case 'TAKE_TURN':
      // increment the turn
      newState.turn += 1
      return newState;

    // set the paused prop to the dialog component
    case 'PAUSE':
      // check if pause type is game start
      newState.gameStart = action.payload.gameStart || false;
      // check if pause type is inventory
      newState.inventory = action.payload.inventory || false;
      newState.paused = action.payload.component;

      return newState;

    case 'GAME_OVER':
      newState.gameOver = true;
      newState.paused = true;

      return newState;

    case 'LOAD_NEXT_MAP':
      const { direction } = action.payload;
      const { currentMap } = newState;

      let { stairs } = maps[currentMap];

      newState.currentMap = stairs[direction];

      return newState;

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default worldReducer;
