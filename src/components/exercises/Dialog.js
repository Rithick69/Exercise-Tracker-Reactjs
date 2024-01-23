import React, { Component } from "react";
import Form from "./Form";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";

export default class extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  handleFormSubmit = exercise => {
    //recived exercise object from onSubmit and
    //handleToggle toggles the opening and closing of the form
    this.handleToggle();
    this.props.onCreate(exercise);
  };
  render() {
    const { open } = this.state,
      { muscles } = this.props;

    return (
      <>
        <Fab
          color="secondary"
          aria-label="add"
          size="small"
          onClick={this.handleToggle}
        >
          <AddIcon />
        </Fab>

        <Dialog open={open} onClose={this.handleToggle}>
          <DialogTitle>Create new exercise</DialogTitle>
          <DialogContent>
            <DialogContentText>Please fill out form below</DialogContentText>
            <Form muscles={muscles} onSubmit={this.handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
