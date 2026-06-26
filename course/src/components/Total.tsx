
interface TotalExercies {
    totalExercises : number;
}
const Total = (prop : TotalExercies) => {
    return (
        <div>
            {prop.totalExercises}
        </div>
    );
}

export default Total;