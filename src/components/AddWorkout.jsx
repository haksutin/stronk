import { useState } from "react";

function addWorkout({ addWorkout }) {
    const [workout, setWorkout] = useState({
        date: "",
        category: "",
        exercises: [{ name: "", sets: 1, details: [{ weight: "", reps: "" }] }]
    });

    //päivittää harjoituksen kentät
    const handleWorkoutChange = (e) => {
        setWorkout({ ...workout, [e.target.name]: e.target.value });
    };

    //päivittää liikkeen kentät
    const handleExerciseChange = (index, e) => {
        const updatedExercises = [...workout.exercises];
        updatedExercises[index] = {
            ...updatedExercises[index],
            [e.target.name]: e.target.value,
            details: new Array(parseInt(e.target.value) || 1).fill({ weight: "", reps: "" })
        };
        setWorkout({ ...workout, exercises: updatedExercises });
    };

    //päivittää settien kentät
    const handleSetChange = (exerciseIndex, setIndex, e) => {
        const updatedExercises = [...workout.exercises];
        updatedExercises[exerciseIndex].details[setIndex] = {
            ...updatedExercises[exerciseIndex].details[setIndex],
            [e.target.name]: e.target.value
        };
        setWorkout({ ...workout, exercises: updatedExercises });
    };

    //lisää liikkeen workout.exercises -listalle
    const addExercise = () => {
        setWorkout({
            ...workout,
            exercises: [...workout.exercises, { name: "", sets: 1, details: [{ weight: "", reps: "" }] }]
        });
    };

    //tallentaa harjoituksen
    const saveWorkout = () => {
        //tarkistaa, että ei ole tyhjiä kenttiä
        if (!workout.date || !workout.category || workout.exercises.some(ex => !ex.name || ex.details.some(set => !set.weight || !set.reps))) {
            alert("All fields must be filled out.");
            return;
        }
        
        addWorkout(workout);
        setWorkout({ date: "", category: "", exercises: [{ name: "", sets: 1, details: [{ weight: "", reps: "" }] }] });
    };

    return (
        <div>
            <form>
                <h2>Add Workout</h2>
                <label>Date
                    <input type="date" name="date" value={workout.date} onChange={handleWorkoutChange} /><br />
                </label>
                <label>Category
                    <input type="text" name="category" value={workout.category} onChange={handleWorkoutChange} /><br />
                </label>

                <h3>Exercises</h3>
                {workout.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} style={{ marginBottom: "15px" }}>
                        <label>Exercise Name
                            <input type="text" name="name" value={exercise.name} onChange={(e) => handleExerciseChange(exerciseIndex, e)} /><br />
                        </label>
                        <label>Sets
                            <input type="number" name="sets" min="1" value={exercise.sets} onChange={(e) => handleExerciseChange(exerciseIndex, e)} /><br />
                        </label>

                        <h4>Set Details</h4>
                        {exercise.details.map((set, setIndex) => (
                            <div key={setIndex} style={{ marginLeft: "15px" }}>
                                <label>Weight (kg)
                                    <input type="number" name="weight" value={set.weight} onChange={(e) => handleSetChange(exerciseIndex, setIndex, e)} /><br />
                                </label>
                                <label>Reps
                                    <input type="number" name="reps" value={set.reps} onChange={(e) => handleSetChange(exerciseIndex, setIndex, e)} /><br />
                                </label>
                            </div>
                        ))}
                    </div>
                ))}

                <input type="button" value="Add Exercise" onClick={addExercise} /><br />
                <input type="button" value="Save Workout" onClick={saveWorkout} />
            </form>
        </div>
    );
}

export default addWorkout;
