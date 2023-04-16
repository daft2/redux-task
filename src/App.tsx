import React from "react";
import { add } from "./redux/slices/taskSlice";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { Box, Button, Container, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import { markCompleted } from "./redux/slices/taskSlice";
import { removeOne } from "./redux/slices/taskSlice";

function App() {
  const tasks = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = React.useState<string>("");

  function generateId(): string {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      id += chars[randomIndex];
    }
    return id;
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTaskName(e.target.value);
  };

  const handleSubmit = () => {
    if (taskName === "") return;
    setTaskName("");
    dispatch(add({ id: generateId(), name: taskName, completed: false }));
  };

  return (
    <Container
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
      maxWidth={false}
    >
      <Box p={2}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextField
            sx={{ marginRight: 1, minWidth: 300 }}
            color="info"
            size="small"
            label="Task Name"
            variant="standard"
            onChange={handleChangeText}
            value={taskName}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Add task
          </Button>
        </Box>

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {tasks.map((task) => {
            const labelId = `checkbox-list-label-${task.id}`;

            return (
              <ListItem
                key={task.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <Delete
                      onClick={() => dispatch(removeOne({ id: task.id }))}
                    />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => dispatch(markCompleted({ id: task.id }))}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.completed}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={task.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
}

export default App;
