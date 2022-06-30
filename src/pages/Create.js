import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

const Create = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" && details === "") {
      setTitleError(true);
      setDetailsError(true);
    }
    fetch("http://localhost:8080/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        details,
        category,
      }),
    })
    .then(() => {
      navigate("/");
    })
  };

  return (
    <Container className="create">
      <Grid container direction="row" justifyContent="center">
        <Box width={600} mt={3}>
          <Card>
            <CardContent>
              <Typography variant="h3" component="div" gutterBottom>
                Create a new post
              </Typography>

              <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <TextField
                  onChange={(e) => setTitle(e.target.value)}
                  className={classes.field}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  error={titleError}
                  helperText={titleError ? "Title is required" : ""}
                />

                <TextField
                  onChange={(e) => setDetails(e.target.value)}
                  className={classes.field}
                  label="Description"
                  required
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  error={detailsError}
                  helperText={detailsError ? "Description is required" : ""}
                />

                <FormControl className={classes.field}>
                  <FormLabel>Note Category</FormLabel>
                  <RadioGroup
                    row
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <FormControlLabel
                      control={<Radio />}
                      value="money"
                      label="Money"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      value="todos"
                      label="Todos"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      value="reminders"
                      label="Reminders"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      value="work"
                      label="Work"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Button type="submit" endIcon={<Send />} variant="contained">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Container>
  );
};

export default Create;
