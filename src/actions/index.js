import axios from 'axios';
import { getToken, clearLocalSignIn } from '../auth';
const baseURL = 'http://ec2-35-155-143-61.us-west-2.compute.amazonaws.com:7004';

export function login(user, password) {
  const promise = axios.post(`${baseURL}/login/`, {
    username: user,
    password
  });
  return {
    type: ActionTypes.LOGIN,
    payload: promise
  }
}

export function register(user, password, firstName, lastName) {
  const promise = axios.post(`${baseURL}/register/`, {
    username: user,
    password,
    first_name: firstName,
    last_name: lastName
  });
  return {
    type: ActionTypes.REGISTER,
    payload: promise
  }
}

export function signOut() {
  clearLocalSignIn();
  console.log("action to sign out");
  return {
    type: ActionTypes.SIGN_OUT,
    payload: {}
  }
}

export function createBoard(title) {
  console.log("Creating board with title:", title);
  const promise = axios.post(`${baseURL}/boards/`, {
    name: title
  }, {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  });
  return {
    type: ActionTypes.CREATE_BOARD,
    payload: promise
  }
}

export function viewBoard(boardID) {
  //console.log("Retrieving board with ID:", boardID);
  const promise = axios.get(`${baseURL}/boards/${boardID}/`, {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  });
  return {
    type: ActionTypes.VIEW_BOARD,
    payload: promise
  }
}

export function clearCurrentBoard() {
  console.log("Clearing current Board from store");
  return {
    type: ActionTypes.CLEAR_CURRENT_BOARD,
  }
}

export function createIdea(title, description, boardID) {
  console.log("Creating idea with title: ", title, " and explanation: ", description, " for id: ", boardID);
  const promise = axios.post(`${baseURL}/ideas/`, {
    title: title,
    description: description,
    board: boardID,
  }, {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  });
  return {
    type: ActionTypes.CREATE_IDEA,
    payload: promise,
  }
}

export function vote(ideaID) {
  console.log("Voting on idea with id: ", ideaID);
  const promise = axios.post(`${baseURL}/vote/`, {
    idea: ideaID
  }, {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  });
  return {
    type: ActionTypes.VOTE,
    payload: promise,
    meta: {
      id: ideaID,
    }
  }
}

export function restoreIdea(ideaID) {
  console.log("Restoring idea with id: ", ideaID);
  const promise = axios.post(`${baseURL}/resurrect_idea/${ideaID}/`, 
  {
    idea: ideaID
  }, {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  });
  return {
    type: ActionTypes.RESTORE_IDEA,
    payload: promise,
    meta: {
      id: ideaID,
    }
  }
}

export function createComment(text, ideaID) {
  console.log("Creating comment with text: ", text);
  console.log("Creating comment on ID: ", ideaID);
  const promise = axios.post(`${baseURL}/comments/`, {
    message: text,
    idea: Number(ideaID)
  }, {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  });
  return {
    type: ActionTypes.CREATE_COMMENT,
    payload: promise
  }
}

export function startVoting(boardID, votesPerUser) {
  console.log("Beginning round of voting on ideas with board id: ", boardID, " with vote limit: ", votesPerUser);
  const promise = axios.post(`${baseURL}/start_round/${boardID}/`, 
  {
    round_votes: votesPerUser, 
  }, 
  {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  });
  return {
    type: ActionTypes.START_VOTING,
    payload: promise,
  }
}

export function endVoting(boardID, cutoffVotes) {
  var cutoff = parseInt(cutoffVotes);
  console.log("Ending round of voting on ideas with board id: ", boardID, " with cutoff: ", cutoff);
  const promise = axios.post(`${baseURL}/end_round/${boardID}/`, 
  {
    cutoff: cutoff, 
  }, 
  {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  });
  return {
    type: ActionTypes.END_VOTING,
    payload: promise,
  }
}

let ActionTypes = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  SIGN_OUT: 'SIGN_OUT',
  CREATE_BOARD: 'CREATE_BOARD',
  VIEW_BOARD: 'VIEW_BOARD',
  CLEAR_CURRENT_BOARD: 'CLEAR_CURRENT_BOARD',
  CREATE_IDEA: 'CREATE_IDEA',
  VIEW_IDEA: 'VIEW_IDEA',
  VOTE: 'VOTE',
  RESTORE_IDEA: 'RESTORE_IDEA',
  START_VOTING: 'START_VOTING',
  END_VOTING: 'END_VOTING',
  CREATE_COMMENT: 'CREATE_COMMENT'
}

export default ActionTypes;
