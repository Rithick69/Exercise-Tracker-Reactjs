import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import withWidth from "material-ui/utils/withWidth";

export default withWidth()(({ muscles, onSelect, category, width }) => {
  //console.log(width);

  //category is a string value but the index is integers, so we need to transform it to index to set the tab value
  const index = category
    ? muscles.findIndex(group => group === category) + 1
    : 0;
  //console.log(index);
  //plus 1 because we have extra tab in the form of "All" so index should be one greater for other tabs

  //below function works first to select the category text and sent to app.js then the from app.js that category text is again sent here to calculate index to change the tab value
  const onIndexSelect = (e, index) => {
    //console.log(index);
    onSelect(index === 0 ? "" : muscles[index - 1]);
    //console.log(muscles[index - 1]);
  };

  return (
    <Paper>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        // minus 1 because we have extra tab in the form of "All" so we are passing string value of muscles[index - 1]
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        // centered={width !== "xs"}
        // scrollable={width === "xs"}
      >
        <Tab label="All" />
        {muscles.map((group, index) => {
          return <Tab key={group} label={group} />;
        })}
      </Tabs>
    </Paper>
  );
});
