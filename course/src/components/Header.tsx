
interface CourseName {
    courseName : string;
}

const Header = (prop : CourseName) => {
    return (
       <h1>{prop.courseName}</h1>
    )
}

export default Header;