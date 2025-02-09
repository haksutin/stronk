import { useState } from "react";
import AddWorkout from "./components/AddWorkout";
import Workouts from "./components/Workouts";
import WorkoutSearch from "./components/WorkoutSearch";

function App() {
  const [workouts, setWorkouts] = useState([
    {
      date: "2025-02-04",
      category: "Upper Body",
      exercises: [
        {
          name: "Bench Press",
          sets: 3,
          details: [
            { weight: 40, reps: 8 },
            { weight: 45, reps: 6 },
            { weight: 45, reps: 6 }
          ]
        },
        {
          name: "Lat Pulldown",
          sets: 3,
          details: [
            { weight: 50, reps: 10 },
            { weight: 50, reps: 8 },
            { weight: 50, reps: 8 }
          ]
        }
      ]
    },
    {
      date: "2025-02-05",
      category: "Lower Body",
      exercises: [
        {
          name: "Deadlift",
          sets: 3,
          details: [
            { weight: 80, reps: 10 },
            { weight: 85, reps: 10 },
            { weight: 90, reps: 8 }
          ]
        }
      ]
    }
  ]);


  const addWorkout = (newWorkout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
  };

  return (
    <div>
      <AddWorkout addWorkout={addWorkout} />
      <Workouts workouts={workouts} />
      <WorkoutSearch workouts={workouts} />
    </div>
  );
}

export default App;
