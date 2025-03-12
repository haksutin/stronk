import React, { useState, useEffect } from "react";
import {
    TextField, Button, Box, Card, CardContent, Grid2, Typography, IconButton, RadioGroup, FormControlLabel,
    Radio, Slider, Snackbar, Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate, useParams } from 'react-router';

function EditWorkout({ workouts, updateWorkout }) {
    const { id } = useParams();
    const navigate = useNavigate();

    // alustus
    const [workout, setWorkout] = useState({
        id: "",
        date: "",
        category: "",
        exercises: [{ name: "", sets: 1, details: [{ weight: "", reps: "" }] }],
        cardio: "no",
        cardioType: "",
        cardioDuration: 0
    });

    // hakee alkuperäisen harjoituksen tiedot
    useEffect(() => {
        const workoutToEdit = workouts.find(workout => workout.id === id);
        if (workoutToEdit) {
            setWorkout(workoutToEdit);
        } else {
            alert("Workout not found!");
            navigate("/");
        }
    }, [id, workouts, navigate]);

    const handleWorkoutChange = (e) => {
        setWorkout({ ...workout, [e.target.name]: e.target.value });
    };

    const handleExerciseChange = (index, e) => {
        const updatedExercises = [...workout.exercises];
        updatedExercises[index] = {
            ...updatedExercises[index],
            [e.target.name]: e.target.value,
            details: new Array(parseInt(e.target.value) || 1).fill({ weight: "", reps: "" }),
        };
        setWorkout({ ...workout, exercises: updatedExercises });
    };

    const handleSetChange = (exerciseIndex, setIndex, e) => {
        const updatedExercises = [...workout.exercises];
        updatedExercises[exerciseIndex].details[setIndex] = {
            ...updatedExercises[exerciseIndex].details[setIndex],
            [e.target.name]: e.target.value,
        };
        setWorkout({ ...workout, exercises: updatedExercises });
    };

    const addExercise = () => {
        setWorkout({
            ...workout,
            exercises: [
                ...workout.exercises,
                { name: "", sets: 1, details: [{ weight: "", reps: "" }] },
            ],
        });
    };

    const removeExercise = (exerciseIndex) => {
        const updatedExercises = workout.exercises.filter((_, index) => index !== exerciseIndex);
        setWorkout({ ...workout, exercises: updatedExercises });
    };

    const saveWorkout = () => {
        if (!workout.date || !workout.category || workout.exercises.some((ex) => !ex.name || ex.details.some((set) => !set.weight || !set.reps))) {
            alert("All fields must be filled out.");
            return;
        }

        updateWorkout(workout);
        navigate("/");

        setOpenSnackbar(true);
    };

    const [openSnackbar, setOpenSnackbar] = useState(false);

    // sliderin merkit
    const marks = [
        { value: 0, label: '0' },
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 30, label: '30' },
        { value: 40, label: '40' },
        { value: 50, label: '50' },
        { value: 60, label: '60' },
    ];

    return (
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2, padding: 3, backgroundColor: "#333" }}>
            <CardContent>
                <Typography variant="h4" sx={{ marginTop: 1 }} gutterBottom>
                    EDIT WORKOUT
                </Typography>

                <form>
                    {/* pvm */}
                    <TextField
                        required
                        fullWidth
                        label="Date"
                        color="none"
                        type="date"
                        name="date"
                        variant="standard"
                        value={workout.date}
                        onChange={handleWorkoutChange}
                        sx={{ marginBottom: 2 }}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            }
                        }}
                    />

                    {/* category */}
                    <TextField
                        required
                        fullWidth
                        label="Category"
                        color="none"
                        name="category"
                        variant="standard"
                        value={workout.category}
                        onChange={handleWorkoutChange}
                        sx={{ marginBottom: 2 }}
                    />

                    <Typography variant="h6" gutterBottom>
                        Exercises
                    </Typography>
                    {workout.exercises.map((exercise, exerciseIndex) => (
                        <Box key={exerciseIndex} sx={{ marginBottom: 3, padding: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                            <Grid2 container spacing={2}>
                                {/* nimi */}
                                <Grid2 item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Exercise Name"
                                        color="none"
                                        name="name"
                                        variant="standard"
                                        value={exercise.name}
                                        onChange={(e) => handleExerciseChange(exerciseIndex, e)}
                                    />
                                </Grid2>

                                {/* setit */}
                                <Grid2 item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Sets"
                                        color="none"
                                        type="number"
                                        name="sets"
                                        variant="standard"
                                        value={exercise.sets}
                                        onChange={(e) => handleExerciseChange(exerciseIndex, e)}
                                        slotProps={{ htmlInput: { min: 1 } }}
                                    />
                                </Grid2>
                            </Grid2>

                            {/* setin tiedot */}
                            <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 1 }}>
                                Set Details
                            </Typography>
                            {exercise.details.map((set, setIndex) => (
                                <Box key={setIndex} sx={{ marginBottom: 2 }}>
                                    <Grid2 container spacing={2}>
                                        {/* paino */}
                                        <Grid2 item xs={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Weight (kg)"
                                                color="none"
                                                type="number"
                                                name="weight"
                                                slotProps={{ htmlInput: { min: 1 }, startAdornment: <InputAdornment position="end">kg</InputAdornment> }}
                                                sx={{
                                                    "& input[type=number]": {
                                                        "-moz-appearance": "textfield",
                                                    },
                                                }}
                                                value={set.weight}
                                                onChange={(e) => handleSetChange(exerciseIndex, setIndex, e)}
                                                variant="standard"
                                            />
                                        </Grid2>

                                        {/* toistot */}
                                        <Grid2 item xs={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Reps"
                                                color="none"
                                                type="number"
                                                name="reps"
                                                variant="standard"
                                                slotProps={{ htmlInput: { min: 1 } }}
                                                value={set.reps}
                                                onChange={(e) => handleSetChange(exerciseIndex, setIndex, e)}
                                            />
                                        </Grid2>
                                    </Grid2>
                                </Box>
                            ))}

                            <IconButton color="error" onClick={() => removeExercise(exerciseIndex)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addExercise}
                        startIcon={<AddIcon />}
                        sx={{ marginBottom: 3 }}>
                        Add Exercise
                    </Button>

                    {/* cardio */}
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                        Cardio?
                    </Typography>
                    <RadioGroup
                        required
                        row
                        name="cardio"
                        value={workout.cardio}
                        onChange={handleWorkoutChange}
                        sx={{ marginBottom: 2 }}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                    {workout.cardio === "yes" && (
                        <>
                            <TextField
                                required
                                fullWidth
                                label="Type"
                                color="none"
                                name="cardioType"
                                variant="standard"
                                value={workout.cardioType}
                                onChange={handleWorkoutChange}
                                sx={{ marginBottom: 2 }}/>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                Duration (minutes)
                            </Typography>
                            <Slider
                                value={workout.cardioDuration}
                                onChange={handleWorkoutChange}
                                name="cardioDuration"
                                min={0}
                                max={60}
                                step={5}
                                marks={marks}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value} min`}
                                sx={{ marginBottom: 6, color: "#bdbdbd" }}/>
                        </>
                    )}

                    {/* Save Workout Button */}
                    <Button variant="contained" color="primary" onClick={saveWorkout} sx={{ width: "30%", display: "block", marginTop: 4, marginLeft: 0 }}>
                        Save Workout
                    </Button>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={() => setOpenSnackbar(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                        }}>
                        <Alert severity="success"
                            color="white"
                            onClose={() => setOpenSnackbar(false)}
                            sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                color: 'white',
                            }}>
                            Workout saved!
                        </Alert>
                    </Snackbar>
                </form>
            </CardContent>
        </Card>
    );
}

export default EditWorkout;
