import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import NoteCards from "../components/NoteCards";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/notes/${id}`, {
      method: "DELETE",
    });

    const newNotes = notes.filter((note) => note.id !== id);

    setNotes(newNotes);
  };

  return (
    <div className="notes">
      <Container>
        <Grid container spacing={1}>
          {notes.map((note) => {
            return (
              <Grid item key={note.id} sm={6} md={6} lg={4}>
                <Box minWidth={300}>
                  <NoteCards note={note} handleDelete={handleDelete} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Notes;
