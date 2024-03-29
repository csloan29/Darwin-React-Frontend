import React, { Component } from 'react';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import { vote } from '../actions';
import { getCurrentBoard } from '../reducers';

const styles = theme => ({
  outline: {
    color: 'white',
    backgroundColor: 'black'
  }
});

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.stopPropagation();
    if (!this.props.liked) {
      var remainingVotes = parseInt(this.props.currentBoard.votes_remaining);
      if (!remainingVotes || remainingVotes === 0) {
        return;
      }
    }
    this.props.vote(this.props.ideaID);
  }

  render() {
    //const { classes } = this.props;
    return (
      <Tooltip title="Like">
        <IconButton className={this.props.className} aria-label="Like Button" onClick={this.handleClick}>
          {this.props.liked ? <ThumbUp /> : <ThumbUpOutlined />}
        </IconButton>
      </Tooltip>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentBoard: getCurrentBoard(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (ideaID) => {
      dispatch(vote(ideaID));
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LikeButton));
