import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse, Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import WorkoutSearch from "./WorkoutSearch";

function Workouts({ workouts }) {
    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);
    const navigate = useNavigate();
    const [openRows, setOpenRows] = useState({});

    const handleSearchResults = (searchResults) => {
        setFilteredWorkouts(searchResults);
    };

    const toggleRow = (index) => {
        setOpenRows(prev => ({ ...prev, [index]: !prev[index] }));
    };

    // edit sivulle siirtyminen valmiiksi
    const handleEditWorkout = (workoutId) => {
        navigate(`/edit/${workoutId}`);
    };

    const sortedWorkouts = [...filteredWorkouts].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                ALL WORKOUTS
            </Typography>
            <Typography variant="h5" color="textSecondary">
                Total workouts: {filteredWorkouts.length}
            </Typography>

            <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#333" }}>
                            <TableCell />
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#333" }}>
                        {sortedWorkouts.map((workout, index) => (
                            <React.Fragment key={index}>
                                <TableRow>
                                    <TableCell>
                                        <IconButton size="small" sx={{ color: "white" }} onClick={() => toggleRow(index)}>
                                            {openRows[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{workout.date}</TableCell>
                                    <TableCell>{workout.category}</TableCell>
                                    <TableCell>
                                        <IconButton size="small" sx={{ color: "white" }} onClick={() => handleEditWorkout(workout.id)}>
                                            <EditIcon /> {/* edit -nappi lisätty valmiiksi */}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={4} sx={{ backgroundColor: "#333", paddingBottom: 0, paddingTop: 0 }}>
                                        <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 2 }}>
                                                <Typography variant="h6" sx={{ mb: 2 }}>Exercises</Typography>

                                                {/* taulukko harjoituksille */}
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell><strong>Exercise</strong></TableCell>
                                                            <TableCell><strong>Sets and weights (kg)</strong></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {workout.exercises.map((exercise, exerciseIndex) => (
                                                            <TableRow key={exerciseIndex}>
                                                                <TableCell>{exercise.name}</TableCell>
                                                                <TableCell>
                                                                    {exercise.details.map(set => `${set.reps}x${set.weight}`).join(", ")}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>

                                                {/* cardio */}
                                                {workout.cardio === "yes" && (
                                                    <Box sx={{ mt: 2 }}>
                                                        <Typography variant="h6">Cardio</Typography>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell><strong>Cardio Type</strong></TableCell>
                                                                    <TableCell><strong>Duration (minutes)</strong></TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell>{workout.cardioType}</TableCell>
                                                                    <TableCell>{workout.cardioDuration}</TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>

                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* hakukomponentti */}
            <WorkoutSearch workouts={workouts} onSearch={handleSearchResults} />

            {/* floating button */}
            <Tooltip title="Add Workout" arrow>
                <Fab color="secondary"
                    aria-label="add"
                    sx={{ position: "fixed", bottom: 16, right: 16 }}
                    onClick={() => navigate("/add")}>
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Box>
    );
}

export default Workouts;