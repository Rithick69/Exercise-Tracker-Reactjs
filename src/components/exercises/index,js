import React, { Fragment } from "react";
import Form from "./Form";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  Paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 500,
    overflowY: "auto"
  }
  //inline styles, which are objects with key value pairs
});
//initially category is null or undefined or false value when no tab is clicked hence displaying all in the first condition which satifies - !category, in the left pane
export default withStyles(styles)(
  ({
    classes,
    muscles,
    groupedExercises,
    category,
    individualExercise,
    onSelectItem,
    individualExercise: {
      id,
      title = "Welcome!!!",
      description = "Click on the workout list to get some more information"
    },
    editMode,
    onDelete,
    onSelectEdit,
    onEdit
  }) => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.Paper}>
          {groupedExercises.map(([group, exercises], index) =>
            !category || category === group ? (
              <Fragment key={group}>
                <Typography
                  variant="h6"
                  style={{ textTransform: "capitalize" }}
                >
                  {group}
                </Typography>

                <List component="ul">
                  {exercises.map((exercise, index) => {
                    return (
                      <ListItem
                        key={exercise.id}
                        button
                        onClick={() => onSelectItem(exercise.id)}
                      >
                        <ListItemText primary={exercise.title} />

                        <ListItemSecondaryAction>
                          <IconButton onClick={() => onSelectEdit(exercise.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => onDelete(exercise.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Fragment>
            ) : null
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.Paper}>
          {editMode ? (
            <Form
              key={individualExercise.id} //sending the key value along with individual Exercise to check if the exercise chnages to update in the right pane on click of any edit icon on the left, When the key changes (i.e. when you switch between different exercises in the edit mode), the Form will be re-created and its state reset.
              exercise={individualExercise} //sending the whole individualExercise, not the one with destructured default values
              muscles={muscles}
              onSubmit={onEdit}
            />
          ) : (
            <Fragment>
              <Typography variant="h5" style={{ textTransform: "capitalize" }}>
                {/* {alert(individualExercise.title)} */}
                {/* using destructured individualExercise's title, if not present then we will get default value set i.e Welcome */}
                {title}
              </Typography>
              <Typography variant="body1" style={{ marginTop: 20 }}>
                {/* using destructured individualExercise's description, if not present then we will get default value set i.e Click on the workout list to get some more information */}
                {description}
              </Typography>
            </Fragment>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
);
