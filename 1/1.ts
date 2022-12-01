import {readFileSync} from 'fs'

const content = readFileSync('1.in', 'utf-8')

const sumElfCalories = (elfLines: string) => {
  return elfLines.split("\n")
                 .map(el => parseInt(el))
                 .reduce((x, y) => x + y)
}

const elvesCalories = content.split("\n\n")
                             .map(el => sumElfCalories(el))

const sortedElvesCalories = elvesCalories.sort((x,y) => y - x)  //not useful for part 1

console.log("First part:", Math.max(...elvesCalories))           
console.log("Second part:", sortedElvesCalories.slice(0, 3).reduce((x,y) => x + y))


