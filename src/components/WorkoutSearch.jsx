import { useState } from 'react';

function WorkoutSearch({ workouts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsSearching(false);
    };

    const performSearch = () => {
        setIsSearching(true);
    };

    const filterWorkouts = () => {
        if (isSearching) {
            const filteredWorkouts = workouts.filter(workout => 
                workout.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                workout.exercises.some(exercise => 
                    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );

            if (filteredWorkouts.length > 0) {
                return filteredWorkouts.map((workout, index) => (
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
                ));
            } else {
                return <p>No workouts found for "{searchTerm}"</p>;
            }
        }
    };

    return (
        <div>
            <form>
                <label>Search
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                    />
                </label>
                <input 
                    type="button" 
                    value="Search" 
                    onClick={performSearch} 
                />
            </form>

            {filterWorkouts()}
        </div>
    );
}

export default WorkoutSearch;
