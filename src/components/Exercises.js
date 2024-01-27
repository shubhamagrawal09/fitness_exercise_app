import { Box, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExerciseCard from './ExerciseCard'
import { exerciseOptions, fetchData } from '../utils/fetchData'

const Exercises = ({ excercises, setExcercises, bodyPart }) => {
  console.log('hola',excercises)
  const [currentPage,setCurrentPage] = useState(1);
  const exercisesPerPage = 9;
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExcercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = excercises.slice(indexOfFirstExcercise, indexOfLastExercise);

  useEffect(() => {
    const fetchExercisesData = async() => {
      let exerciseData = [];
      if(bodyPart === 'all'){
        exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions)
      }else {
        exerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,exerciseOptions)
      }
      setExcercises(exerciseData)
    }
    fetchExercisesData();
  },[bodyPart])

  const paginate = (e,value) => {
    setCurrentPage(value);
    window.scrollTo({ top: '1800', behavior: 'smooth' })
  }
  return (
    <Box id="excercises" sm={{mt: { lg: '110px' }}} mt="50px" p="20px">
      <Typography variant='h3' mb="46px">
        Showing Results
      </Typography>
      <Stack direction="row" sx={{ gap: { lg: '110px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        {
          currentExercises?.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))
        }
      </Stack>
      <Stack mt="100px" alignItems="center">
        {excercises.length > 9 && (
          <Pagination color='standard' shape='rounded' defaultPage={1} count={Math.ceil(excercises.length / 9)} page={currentPage} onChange={paginate} size='large' />
        )}
      </Stack>
    </Box>
  )
}

export default Exercises