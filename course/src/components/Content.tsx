
interface ExerciseContent{
    name : string;
    exerciseCount : number;
    kind : string;
    description : string;
    groupProjectCount : number;
    backgroundMaterial : string;
}

interface ContentProp {
  courseParts : ExerciseContent[]
}
/**
 * 
 * courseParts will be like this
 * [
 *  {
 *      name : "exercise name";
        exerciseCount : 3;
 *  }
 * ]
 * prop : {courseParts : ExerciseContent[]}
 */
const Content = ({courseParts} : ContentProp) => {
    courseParts.forEach(course => {
      course.
      console.log(course.name, ":" , course.exerciseCount)
    })

    return (
        <div>
           <p>
             {courseParts[0].name} {courseParts[0].exerciseCount}
           </p>
            <p>
             {courseParts[1].name} {courseParts[1].exerciseCount}
           </p>
            <p>
             {courseParts[2].name} {courseParts[2].exerciseCount}
           </p>
        </div>
    )
}

export default Content