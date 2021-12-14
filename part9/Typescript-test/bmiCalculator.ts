const calculateBmi = (height: number, weight: number) => {
    if (!height || !weight) {
        throw new Error('height and weight needed');
    }


    let bmi = weight / (height / 100) / (height / 100)

    if (bmi < 16) {
        return "Underweight (Severe thinness)"
    } else if (bmi < 16.9) {
        return "Underweight (Moderate thinness)"
    } else if (bmi < 18.4) {
        return "Underweight (Mild thinness)"
    } else if (bmi < 24.9) {
        return "Normal (healthy weight)"
    } else if (bmi < 29.9) {
        return "Overweight (Pre-obese)	"
    } else if (bmi < 34.9) {
        return "Obese (Class I)"
    } else if (bmi < 39.9) {
        return "Obese (Class II)"
    } else {
        return "Obese (Class III)"
    }

}
const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
if (a && b) {

    console.log(calculateBmi(a, b))
}

export default calculateBmi;