import express = require('express');
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.get('/hello', (_, res) => {
    res.send("Hello Full Stack!");
});

app.use(express.json());
app.get('/bmi', (req, res) => {
    let height = req.query.height;
    let weight = req.query.weight;
    let value:String = ""
    try {
        value = calculateBmi(Number(height), Number(weight))
        res.json({
            weight: weight,
            height:height,
            bmi:value
        });
    } catch (error) {
        res.status(500).send({
            message: "malformed values"
        })
    }

    
});

app.post('/exercises', (req, res) => {
    let daily_exercises = req.body.daily_exercises;
    let target = req.body.target;
    
    if( !daily_exercises || !target) {
        res.status(405).send({error: "parameters missing"}) 
    }
    try {
        let value = calculateExercises(daily_exercises, target)
        res.json(value);
    } catch (error) {
        res.status(500).send({
            message: "malformed parameters"
        })
    }

    
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});