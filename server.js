const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());

app.post('/api/order', (req, res) => {
    const orderData = req.body;
    const filePath = path.join(__dirname, 'order.json');
    const phoneNumber = orderData.phone;

    const now = new Date();
    const timestamp = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    orderData.timestamp = timestamp;

    fs.readFile(filePath, 'utf8', (err, data) => {
        let orders = [];
        let discountMessage = '';

        if (!err) {
            try {
                orders = JSON.parse(data);

                const phoneExists = orders.some(order => order.phone === phoneNumber);
                if (phoneExists) {
                    discountMessage = 'You have discount 10%!'; 
                }
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                orders = []; 
            }
        }

        orders.push({
            ...orderData,
            products: orderData.products || [], 
        });

        fs.writeFile(filePath, JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                console.error('Error saving data:', err);
                return res.status(500).send('Error server');
            }
            res.status(200).json({ message: discountMessage });
        });
    });
});

app.get('/api/check-phone/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    const filePath = path.join(__dirname, 'order.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let orders = [];

        if (!err) {
            try {
                orders = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                orders = [];
            }
        }

        const phoneExists = orders.some(order => order.phone === phoneNumber);
        const discount = phoneExists ? true : false;

        res.json({ discount });
    });
});


app.get('/', (req, res) => {
    res.send('Server working!');
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
