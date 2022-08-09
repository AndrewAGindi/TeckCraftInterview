// https://expressjs.com/en/5x/api.html
const express = require('express');
const app = express();

// Adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

const orders = [
    {
        "id": "1",
        "title": "new mobile order",
        "date" : "2016-09-22",
        "type" : "iPhone13",
        "customer" : "customer-1"
      },
      {
        "id": "2",
        "title": "new mobile order",
        "date" : "2016-09-22",
        "type" : "iPhone13",
        "customer" : "customer-2"
      }
]

app.post('/orders', (req, res) => {
    const order = {
        id: orders.length + 1,
        title: req.body.name,
        date: req.body.date,
        type: req.body.type,
        customer: req.body.name
    };
    orders.push(order);
    res.status(200).send(order);
});

app.get('/orders', (req, res) => {
    res.status(200).send(orders);
});

app.get('/orders/:type/:date', (req, res) => {
    const order = orders.find((c => c.type === req.params.type) && (d => d.date.replace(/-/g, '') === req.params.date))
    if (!order) res.status(404).send('The order with the given Type and Date was not found')
    const details = {
        type: order.type
    }
    res.status(200).send(order);
});

app.listen(PORT, () => console.log('Listening on port 3000...'))