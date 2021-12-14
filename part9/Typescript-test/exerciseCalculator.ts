interface exerciseInterface {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


const calculateExercises = (days: number[], dailyhours: number): exerciseInterface => {
    if (typeof dailyhours !== "number") {
        throw new Error("malformatted parameters")
    }
    for (let i = 0; i < days.length; i++) {
        if (typeof days[i] !== "number") {
            if(Number.isNaN(Number(days[i])) ) {
                throw new Error("malformatted parameters")
            }   
           
        }
    }
    let average = days.reduce((partial_sum, a) => partial_sum + Number(a), 0) / days.length
    let rating = 0
    if (average < dailyhours * 0.5) {
        rating = 1
    } else if (average < dailyhours * 1.5) {
        rating = 2
    } else {
        rating = 3
    }
    let ratingDescription = ""
    if (rating == 1) {
        ratingDescription = "badly done"
    } else if (rating == 2) {
        ratingDescription = 'not too bad but could be better'
    } else {
        ratingDescription = "very well done"
    }
    return {
        periodLength: days.length,
        trainingDays: days.filter(x => Number(x) > 0).length,
        success: average >= dailyhours,
        target: dailyhours,
        average: average,
        rating: rating,
        ratingDescription: ratingDescription
    }

}
const args = process.argv.slice(2)
let target: number = Number(args[0])
let days: number[] = []
args.forEach((value, index) => {
    if (index == 0) {
        target = Number(value)
    } else[
        days.push(Number(value))
    ]
})

if (process.argv[2]) {

    console.log(calculateExercises(days, target))
}
export default calculateExercises;