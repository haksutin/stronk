import { useState } from "react";
import AddWorkout from "./components/AddWorkout";
import EditWorkout from "./components/EditWorkout";
import Workouts from "./components/Workouts";
import NavMenu from "./navigation/Menu";
import TrainingChart from "./components/TrainingChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, deepOrange, indigo } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

function App() {
  // esimerkkidata
  const [workouts, setWorkouts] = useState([
    {
      id: 1, date: "2024-04-05", category: "Upper Body", 
      exercises: [
        { name: "Bench Press", sets: 3, details: [{ weight: 50, reps: 8 }, { weight: 55, reps: 6 }, { weight: 57, reps: 5 }] },
        { name: "Pull-ups", sets: 3, details: [{ weight: 0, reps: 10 }, { weight: 0, reps: 8 }, { weight: 0, reps: 8 }] }
      ], cardio: "yes", cardioType: "Treadmill", cardioDuration: 15
    },
    {
      id: 2, date: "2024-04-12", category: "Lower Body", 
      exercises: [
        { name: "Squat", sets: 3, details: [{ weight: 70, reps: 10 }, { weight: 75, reps: 8 }, { weight: 80, reps: 6 }] },
        { name: "Leg Press", sets: 3, details: [{ weight: 120, reps: 12 }, { weight: 130, reps: 10 }, { weight: 140, reps: 8 }] }
      ], cardio: "no"
    },
    {
      id: 3, date: "2024-05-03", category: "Full Body", 
      exercises: [
        { name: "Deadlift", sets: 3, details: [{ weight: 80, reps: 6 }, { weight: 85, reps: 5 }, { weight: 90, reps: 4 }] },
        { name: "Dips", sets: 3, details: [{ weight: 0, reps: 12 }, { weight: 0, reps: 10 }, { weight: 5, reps: 8 }] }
      ], cardio: "yes", cardioType: "Cycling", cardioDuration: 20
    },
    {
      id: 4, date: "2024-06-07", category: "Upper Body", 
      exercises: [
        { name: "Shoulder Press", sets: 3, details: [{ weight: 25, reps: 10 }, { weight: 27, reps: 8 }, { weight: 30, reps: 6 }] },
        { name: "Bicep Curls", sets: 3, details: [{ weight: 12, reps: 12 }, { weight: 14, reps: 10 }, { weight: 16, reps: 8 }] }
      ], cardio: "yes", cardioType: "Jump Rope", cardioDuration: 10
    },
    {
      id: 5, date: "2024-07-15", category: "Lower Body", 
      exercises: [
        { name: "Lunges", sets: 3, details: [{ weight: 20, reps: 12 }, { weight: 22, reps: 10 }, { weight: 25, reps: 8 }] },
        { name: "Calf Raises", sets: 3, details: [{ weight: 30, reps: 15 }, { weight: 35, reps: 12 }, { weight: 40, reps: 10 }] }
      ], cardio: "no"
    },
    {
      id: 6, date: "2024-08-09", category: "Full Body", 
      exercises: [
        { name: "Clean & Jerk", sets: 3, details: [{ weight: 40, reps: 5 }, { weight: 45, reps: 4 }, { weight: 50, reps: 3 }] },
        { name: "Plank", sets: 1, details: [{ weight: 0, reps: 60 }] }
      ], cardio: "yes", cardioType: "Rowing", cardioDuration: 12
    },
    {
      id: 7, date: "2024-09-05", category: "Upper Body", 
      exercises: [
        { name: "Incline Bench Press", sets: 3, details: [{ weight: 45, reps: 10 }, { weight: 50, reps: 8 }, { weight: 55, reps: 6 }] },
        { name: "Tricep Dips", sets: 3, details: [{ weight: 0, reps: 12 }, { weight: 5, reps: 10 }, { weight: 10, reps: 8 }] }
      ], cardio: "yes", cardioType: "Running", cardioDuration: 15
    },    
    {
      id: 8, date: "2024-10-03", category: "Upper Body", exercises: [
        { name: "Bench Press", sets: 3, details: [{ weight: 50, reps: 8 }, { weight: 55, reps: 6 }, { weight: 55, reps: 6 }] },
        { name: "Shoulder Press", sets: 3, details: [{ weight: 20, reps: 10 }, { weight: 22, reps: 8 }, { weight: 22, reps: 8 }] }
      ], cardio: "yes", cardioType: "Rowing", cardioDuration: 12
    },
    {
      id: 9, date: "2024-10-10", category: "Lower Body", exercises: [
        { name: "Squat", sets: 3, details: [{ weight: 70, reps: 10 }, { weight: 75, reps: 8 }, { weight: 80, reps: 6 }] }
      ], cardio: "no"
    },
    {
      id: 10, date: "2024-11-05", category: "Upper Body", exercises: [
        { name: "Pull-Ups", sets: 3, details: [{ weight: "Bodyweight", reps: 10 }, { weight: "Bodyweight", reps: 8 }, { weight: "Bodyweight", reps: 6 }] },
        { name: "Dumbbell Curls", sets: 3, details: [{ weight: 12, reps: 10 }, { weight: 14, reps: 8 }, { weight: 14, reps: 8 }] }
      ], cardio: "yes", cardioType: "Treadmill", cardioDuration: 20
    },
    {
      id: 11, date: "2024-12-12", category: "Full Body", exercises: [
        { name: "Deadlift", sets: 3, details: [{ weight: 100, reps: 8 }, { weight: 105, reps: 6 }, { weight: 110, reps: 6 }] },
        { name: "Leg Press", sets: 3, details: [{ weight: 120, reps: 10 }, { weight: 130, reps: 8 }, { weight: 140, reps: 8 }] }
      ], cardio: "no"
    },
    {
      id: 12, date: "2025-01-08", category: "Upper Body", exercises: [
        { name: "Incline Bench Press", sets: 3, details: [{ weight: 40, reps: 10 }, { weight: 45, reps: 8 }, { weight: 50, reps: 6 }] },
        { name: "Tricep Dips", sets: 3, details: [{ weight: "Bodyweight", reps: 12 }, { weight: "Bodyweight", reps: 10 }, { weight: "Bodyweight", reps: 8 }] }
      ], cardio: "yes", cardioType: "Cycling", cardioDuration: 15
    },
    {
      id: 13, date: "2025-02-04", category: "Upper Body", exercises: [
        { name: "Bench Press", sets: 3, details: [{ weight: 40, reps: 8 }, { weight: 45, reps: 6 }, { weight: 45, reps: 6 }] },
        { name: "Lat Pulldown", sets: 3, details: [{ weight: 50, reps: 10 }, { weight: 50, reps: 8 }, { weight: 50, reps: 8 }] }
      ], cardio: "yes", cardioType: "Treadmill", cardioDuration: 15
    },
    {
      id: 14, date: "2025-02-05", category: "Lower Body", exercises: [
        { name: "Deadlift", sets: 3, details: [{ weight: 80, reps: 10 }, { weight: 85, reps: 10 }, { weight: 90, reps: 8 }] }
      ], cardio: "no"
    },
    {
      id: 15, date: "2025-03-02", category: "Upper Body", exercises: [
        { name: "Bench Press", sets: 3, details: [{ weight: 45, reps: 8 }, { weight: 50, reps: 6 }, { weight: 50, reps: 6 }] },
        { name: "Seated Row", sets: 3, details: [{ weight: 55, reps: 10 }, { weight: 60, reps: 8 }, { weight: 60, reps: 8 }] }
      ], cardio: "yes", cardioType: "Rowing", cardioDuration: 10
    },
    {
      id: 16, date: "2025-03-10", category: "Lower Body", exercises: [
        { name: "Squat", sets: 3, details: [{ weight: 80, reps: 10 }, { weight: 85, reps: 8 }, { weight: 90, reps: 6 }] },
        { name: "Lunges", sets: 3, details: [{ weight: 20, reps: 12 }, { weight: 25, reps: 10 }, { weight: 25, reps: 8 }] }
      ], cardio: "no"
    },
    {
      id: 17, date: "2025-02-04", category: "Upper Body", exercises:
        [{ name: "Bench Press", sets: 3, details: [{ weight: 40, reps: 8 }, { weight: 45, reps: 6 }, { weight: 45, reps: 6 }] },
        { name: "Lat Pulldown", sets: 3, details: [{ weight: 50, reps: 10 }, { weight: 50, reps: 8 }, { weight: 50, reps: 8 }] }],
      cardio: "yes", cardioType: "Treadmill", cardioDuration: 15
    },
    {
      id: 18, date: "2025-02-05", category: "Lower Body", exercises: [
        { name: "Deadlift", sets: 3, details: [{ weight: 80, reps: 10 }, { weight: 85, reps: 10 }, { weight: 90, reps: 8 }] }],
      cardio: "no"
    }
  ]);


  const addWorkout = (newWorkout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
  };

  const updateWorkout = (updatedWorkout) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout.id === updatedWorkout.id ? updatedWorkout : workout
      )
    );
  };

  const theme = createTheme({
    palette: {
      primary: { main: '#161616', contrastText: '#FFFFFF' },
      secondary: { main: grey[800], contrastText: '#FFFFFF' },
      text: { primary: grey[400], secondary: deepOrange[500] },
      background: { default: grey[900] },
    },
    typography: {
      fontFamily: "'Reddit Sans', serif",
    },
    components: {
      MuiTabs: {
        styleOverrides: {
          root: { backgroundColor: grey[900] },
          indicator: { backgroundColor: deepOrange[500] },
        }
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavMenu />
        <Routes>
          <Route path='/' element={<TrainingChart workouts={workouts} />} />
          <Route path='/add' element={<AddWorkout addWorkout={addWorkout} />} />
          <Route path='/workouts' element={<Workouts workouts={workouts} />} />
          <Route path="/edit/:id" element={<EditWorkout workouts={workouts} updateWorkout={updateWorkout} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
