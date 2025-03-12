import { useState } from "react";
import { TextField, Button, Box, Grid2, Typography } from "@mui/material";

function WorkoutSearch({ workouts, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const performSearch = () => {
    const filteredWorkouts = workouts.filter((workout) =>
      workout.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.exercises.some((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      [workout.cardio, workout.cardioType].some(field =>
        field && field.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    onSearch(filteredWorkouts);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4, padding: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        SARCH WORKOUTS
      </Typography>

      <form onSubmit={(e) => e.preventDefault()}>
        <Grid2 container spacing={2} alignItems="center" justifyContent="center">
          <Grid2 item xs={8}>
            <TextField
              fullWidth
              label="Search by Category or Exercise"
              color="none"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "secondary",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#555",
                    textColor: "secondary",
                  },
                },
              }}/>
          </Grid2>

          <Grid2 item xs={4}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={performSearch}>
              Search
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
}

export default WorkoutSearch;
