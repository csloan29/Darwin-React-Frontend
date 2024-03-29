import ActionTypes from '../actions';

export default function(state = {}, action){
  switch (action.type) {
    case ActionTypes.VIEW_BOARD:
      if(action.payload.status === 200) {
        //console.log("Data returned from viewBoard:", action.payload.data);
        return action.payload.data;
      }
      return state;
    case ActionTypes.CREATE_BOARD:
      if (action.payload.status === 201) {
        console.log("create board promise resolved with data: ", action.payload);
        return action.payload.data;
      }
      return state;
    case ActionTypes.CLEAR_CURRENT_BOARD:
      return {};
    case ActionTypes.CREATE_IDEA:
      if (action.payload.status === 201) {
        console.log("successfully created new idea for board with data: ", action.payload);
        var newState = {
          ...state
        };
        newState.ideas = state.ideas.concat([action.payload.data]);
        return newState;
      }
      return state;
    case ActionTypes.VOTE:
      if (action.payload.status === 200 || action.payload.status === 201) {
        console.log("Data returned from voting: ", action.payload, " on id: ", action.meta.id);
        newState = {
          ...state
        }
        for (let ideaIndex in newState.ideas) {
          if (newState.ideas[ideaIndex].id === action.meta.id) {
            newState.ideas[ideaIndex].has_voted = !newState.ideas[ideaIndex].has_voted;
          }
        }
        return newState;
      }
      return state;
    case ActionTypes.RESTORE_IDEA:
    if (action.payload.status === 200 || action.payload.status === 201) {
      console.log("Data returned from restoring idea: ", action.payload, " on id: ", action.meta.id);
      //TODO: handle doing restore idea here
    }
      return state;  
    case ActionTypes.START_VOTING:
      if (action.payload.status === 200 || action.payload.status === 201) {
      console.log("Data returned from starting new round of voting: ", action.payload);
        //TODO: handle doing new round of voting here
      }
      return state;
    case ActionTypes.END_VOTING:
    if (action.payload.status === 200 || action.payload.status === 201) {
      console.log("Data returned from ending round of voting: ", action.payload);
        //TODO: handle doing new round of voting here
      }
      return state;
    default:
      return state;
  }
}
