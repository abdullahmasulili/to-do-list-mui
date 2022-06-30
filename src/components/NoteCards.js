import React from "react";
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { blue, green, pink, yellow } from "@mui/material/colors";

// const useStyles = makeStyles({
//   avatar: {
//     bgcolor: (note) => {
//       switch (note.category){
//         case "work":
//           return yellow[700]
//         case "money":
//           return green[500]
//         case "todos":
//           return pink[500]
//         default:
//           return blue[500]
//       }
//     }
//   }
// })

export default function NoteCards({ note, handleDelete }) {
  const avatar = (category) => {
    switch (category){
      case "work":
        return { bgcolor: yellow[700] }
      case "money":
        return { bgcolor: green[500] }
      case "todos":
        return { bgcolor: pink[500] }
      default:
        return { bgcolor: blue[500] }
    }
  }
  return (
    <Card elevation={3}>
      <CardHeader
      action={
        <IconButton color="warning" onClick={() => handleDelete(note.id)}>
            <Delete/>
        </IconButton>
      } 
      title={
        <Typography variant="h4" component="h5">
            {note.title}
        </Typography>
      }
      subheader={note.category}
      avatar={
        <Avatar sx={avatar(note.category)}>
            {note.category[0].toUpperCase()}
        </Avatar>
      }
      />
      <CardContent>
        <Typography variant="body2" textAlign="justify" component="p">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
}
