function Workouts({ workouts }) {
    const totalWorkouts = workouts.length;

    return (
        <div>
            <h3>All Workouts</h3>
            <h4>Total Workouts: {totalWorkouts}</h4>
            {workouts.map((workout, index) => (
                <div key={index}>
                    <p>Date: {workout.date}</p>
                    <p>Category: {workout.category}</p>
                    <p>Exercises:</p>
                    {workout.exercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex}>
                            <p>{exercise.name}</p>
                            <p>{exercise.details
                                    .map(set => `${set.reps}x${set.weight}`)
                                    .join(', ')}</p>
                        </div>
                    ))}<br />
                </div>
            ))}
        </div>
    );
}

export default Workouts;
