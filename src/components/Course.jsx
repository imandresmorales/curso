const Course = ({course}) => {
    const arreglo = course.parts
    let total= arreglo.reduce( (result, element) => {
      return result + element.exercises;
    },0);
  
    return(
      <>
        <h1>{course.name}</h1>
        {arreglo.map( part => 
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
        )}
        <strong>total of {total} exercises</strong>
      </>
    )
  }

  export default Course