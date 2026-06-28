
import Header from "./components/Header";
// import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {

  interface CoursePartBase {
    name : string;
    exerciseCount : number;
  }

  interface CoursePartWithDescription extends CoursePartBase{
    description : string;
  }

  interface CoursePartBasic extends CoursePartWithDescription{
    kind : "basic"
  }

  interface CoursePartGroup extends CoursePartBase{
    groupProjectCount : number;
    kind : "group"
  }

  interface CoursePartBackground extends CoursePartWithDescription{
    backgroundMaterial : string;
    kind : "background"
  }

  interface CoursePartSpecial extends CoursePartWithDescription{
    kind : "special",
    requirements : string[]
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

  const courseName = "Half Stack application development";

  interface Content {
    courseParts : CoursePart[]
  }

  const assertNever = (value : never) : never => {
    throw new Error(`Unhandled discriminated union member : ${JSON.stringify(value)}`)
  }

  const Part = ({course} : {course : CoursePart})=> {
  
    if(course.kind == 'basic'){
      return (
        <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <em>{course.description}</em>
          <hr/>
        </div>
      )
    }

    if(course.kind === 'group'){
      return (
         <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <p>project exercises {course.groupProjectCount}</p>
          <hr/>
        </div>
      )
    }

    if(course.kind == 'background'){
      return (
        <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <em>{course.description}</em>
          <p>submit to {course.backgroundMaterial}</p>
          <hr/>
        </div>
      )
    }

    if(course.kind == 'special'){
      return(
         <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <em>Description : {course.description}</em>
          <p>required skills : {course.requirements.join(", ")}</p>
          <hr/>
        </div>
      )
    }
  }
  const Content = ({courseParts} : Content) => {
    // courseParts.forEach(course => {
    //   switch(course.kind){
    //     case "basic":
    //       console.log(course.kind, course.description);
    //       break;
    //     case 'group':
    //       console.log(course.kind,course.groupProjectCount);
    //       break;
    //     case 'background':
    //       console.log(course.kind,course.backgroundMaterial);
    //       break;
    //     default :
    //       return assertNever(course)
    //   }
    // })
      return (
        <div>
          {
            courseParts.map(course => {
              return (
                <Part course={course}/>
              )
            })
          }
        </div>
    )
  }

  const courseParts  : CoursePart[]= [
    {
      name : "Fundamentals",
      exerciseCount : 10,
      description : "This is an awesome course part",
      kind : "basic"
    },
    {
      name : "Using props to pass data",
      exerciseCount : 7,
      groupProjectCount : 3,
      kind : "group"
    },
    {
      name : "Basics of type Narrowing",
      exerciseCount : 7,
      description : "How to go from unknown to string",
      kind : "basic",
    },
    {
      name : "Deeper type usage",
      exerciseCount : 14,
      description : "Confusing description",
      backgroundMaterial : "http://type-level-typescript.com/template-literal-types",
      kind : "background"
    },
    {
      name : "TypeScript in frontend",
      exerciseCount : 10,
      description : "a hard part",
      kind : "basic"
    },
    {
      name : "Backend development",
      exerciseCount : 21,
      description : "Typing the backend",
      requirements : ["nodejs", "jest"],
      kind : "special"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part)=> sum + part.exerciseCount,0);

  return (
    <div>
      {/* <h1>{courseName}</h1> */}
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Total totalExercises={totalExercises}/>
    </div>
  )
}

export default App;