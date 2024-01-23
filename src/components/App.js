import React, { Component, Fragment } from "react";
import { Header, Footer } from "./layouts";
import Exercises from "./exercises";
import { muscles, exercises } from "../store.js";
import CssBaseline from "@material-ui/core/CssBaseline";
//CssBaseline resets margin and borders across all browsers

export default class extends Component {
  state = {
    exercises,
    category: "",
    exercise: {},
    editMode: false
  };

  getExercisesByMuscles() {
    const initExercises = muscles.reduce((allmuscles, category) => {
      //console.log(allmuscles);
      return {
        ...allmuscles,
        [category]: []
      };
    }, {});

    //console.log(initExercises);

    return Object.entries(
      this.state.exercises.reduce((acc, curr) => {
        const { muscles } = curr;
        //acc[muscles] = acc[muscles] ? [...acc[muscles], curr] : [curr];
        acc[muscles] = [...acc[muscles], curr];
        //console.log(acc[muscles]);
        //console.log(acc);
        return acc;
      }, initExercises)
    );
  }
  handleCategorySelect = category => {
    this.setState({
      category
    });
  };
  handleExerciseSelect = id => {
    this.setState(prevState => {
      return {
        exercise: prevState.exercises.find(ex => ex.id === id),
        editMode: false // when you want just view the content, and if the form is open in the right pane, it closes it by setting editMode to false
      };
    });
  };

  handleExerciseCreate = exercise => {
    //console.log(exercise);
    this.setState(prevState => {
      return {
        exercises: [...prevState.exercises, exercise]
      };
    });
  };

  handleExerciseDelete = id => {
    //alert(id);
    this.setState(prevState => ({
      exercises: prevState.exercises.filter(ex => ex.id !== id),

      editMode: prevState.exercise.id === id ? false : prevState.editMode,
      //close the form only if the exercise we are deleteing is in the right pane, reset it to default exercise object, othwerwise keep the form opens

      //editMode: false, //after deleting closing the form, irrespective of what is opened in the right pane, just close it and set it to default exercise

      //exercise: {} //displaying the default values in right pane after deleting any item in the left pane, actually this shouldnt happen every time when you are editing different itme and want to delete some other item, it should reset

      exercise: prevState.exercise.id === id ? {} : prevState.exercise
      //if the exercise we're deleting is in right pane already then set the right pane to empty i.e default exercise object value, othwerwise keep the exercise in the right pone
    }));
  };

  handleExerciseSelectEdit = id => {
    //alert(id);
    //this.setState({exercise:this.state.exercise}) //wrong accessing state object directly
    //using prevState.exercises cuz exercises state might get changed while we're about to click on it, so to avoid wrong indormation, its better go with prevState
    this.setState(prevState => {
      return {
        exercise: prevState.exercises.find(ex => ex.id === id),
        editMode: true
      };
    });
  };
  handleExerciseEdit = exercise => {
    //receive updated exercise, next filter all the exercises so that the exercises shouldnt't contain the recieved exercise, ...spread it, and add it back,
    this.setState(({ exercises }) => ({
      exercises: [...exercises.filter(ex => ex.id !== exercise.id), exercise],
      exercise: exercise,
      editMode: false //closes dialog after editing also, my feature :)
      //now updating the exercise property on the state also to keep in sync with left pane when edit happens in right pane
    }));
  };
  render() {
    const groupedExercises = this.getExercisesByMuscles();
    //console.log(groupedExercises);

    return (
      <Fragment>
        <CssBaseline />

        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />

        <Exercises
          individualExercise={this.state.exercise}
          category={this.state.category}
          onSelectItem={this.handleExerciseSelect}
          groupedExercises={groupedExercises}
          onDelete={this.handleExerciseDelete}
          editMode={this.state.editMode}
          onSelectEdit={this.handleExerciseSelectEdit}
          muscles={muscles}
          onEdit={this.handleExerciseEdit}
        />

        <Footer
          category={this.state.category}
          muscles={muscles}
          onSelect={this.handleCategorySelect}
        />
      </Fragment>
    );
  }
}
