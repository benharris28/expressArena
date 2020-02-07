const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Express!!!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy burgers!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are the details of your request: 
        Base URL: ${req.baseURL}
        Host: ${req.hostname}
        Path: ${req.path}
        `;
        res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/sum', (req, res) => {
    const {a,b} = req.query;

    if(!a) {
        return res
                .status(400)
                .send('a is required');
    }

    if(!b) {
        return res
                .status(400)
                .send('b is required');
    }

    const numA = Number(a);
    const numB = Number(b);

    const math = numA + numB;

    const responseText = `Your sum is ${math}`;
    res
    .status(200)
    .send(responseText);
});

app.get('/cipher', (req, res) => {
    const { text, shift } = req.query;

    if(!text) {
        return res
                .status(400)
                .send('text is required');
    }

    if(!shift) {
        return res
                .status(400)
                .send('shift is required');
    }

    const shiftNumber = Number(shift);

    const base = 'A'.charCodeAt(0);

    const cipher = text
                    .toUpperCase()
                    .split('')
                    .map(char => {
                        const code = char.charCodeAt(0);

                        if(code < base || code > (base + 26)) {
                            return char;
                        }

                        let diff = code - base;
                        diff = diff + shiftNumber;

                        diff = diff % 26;

                        const shiftedChar = String.fromCharCode(base + diff);
                        return shiftedChar;
                    })
                    .join('');

                    res
                    .status(200)
                    .send(cipher);

                });


app.get('/lotto', (req, res) => {
    const numbers = [];

})
app.listen(8000, () => {
    console.log('Express server is listening on port 8000 ');
});