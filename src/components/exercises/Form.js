import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  formControl: {
    width: 250
  }
});

export default withStyles(styles)(
  class extends Component {
    state = this.getInitState();

    getInitState() {
      const { exercise } = this.props;
      return exercise ? exercise : { title: "", description: "", muscles: "" };
    }

    //compoenent will recieve props helps in updating the state which are dependant on props, beware that the component must be controlled component in order to use this - recommended, here Form.js is a controlled component cuz it has its own state

    //when you click on edit or select an item in the left pane the exercise object in the app state is updated, so when you switch between multiple edits, the exercise populated inside the form must also chnage, i.e the exercise object must change, so component will receive props sends the new exercise every time

    //...............deprecated
    // UNSAFE_componentWillReceiveProps({ exercise }) {
    //   //now received new/updated exercise and spreading it out all its properties, when clicked on edit icon or any item in the left pane, now setting it as a new state using setState method
    //   this.setState({
    //     ...exercise
    //   });
    // }

    //new way to do it or simply you can use key on form component
    // static getDerivedStateFromProps(props, state) {
    //   if ((props.exercise ? props.exercise.id : null) !== state.id) {
    //     return {
    //       ...props.exercise
    //     };
    //   }
    //   return null;
    // }

    // static getDerivedStateFromProps({ exercise }) {
    //   return exercise;
    // }

    handleChange = name => ({ target: { value } }) => {
      this.setState({
        [name]: value
      });
    };

    handleSubmit = () => {
      //previously this was directly onCreate, now sending it to dialog which then sends to header -> app

      //onSubmit is common for both editing(which comes from index.js) and adding new(which comes from dialog.js), so check out for this prop from dialog.js and index.js, which works separately for both
      this.props.onSubmit({
        //override id if present - during editing, else add new id, id is the title of the exercise
        id: this.state.title.toLocaleLowerCase().replace(/ /g, "-"),
        ...this.state
      });
      //this.setState(this.getInitState()); //referring initState to set updated exercise after editing or adding which is reponsible for handling state having exercise object
      // console.log(this.state);
    };

    render() {
      const { title, description, muscles } = this.state,
        { muscles: categories, classes, exercise } = this.props;

      return (
        <form>
          <TextField
            label="Title"
            value={title}
            onChange={this.handleChange("title")}
            className={classes.formControl}
            margin="normal"
          />
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel>Muscles</InputLabel>
            <Select value={muscles} onChange={this.handleChange("muscles")}>
              {categories.map((category, index) => {
                return (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <TextField
            multiline
            rows={4}
            label="Description"
            value={description}
            onChange={this.handleChange("description")}
            className={classes.formControl}
            margin="normal"
          />
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleSubmit}
          >
            {exercise ? "EDIT" : "CREATE"}
          </Button>
        </form>
      );
    }
  }
);
