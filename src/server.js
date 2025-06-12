import express from 'express';
import cors from 'cors'
import PinoHttp from "pino-http";
import { getAllContacts, getContactById } from './services/contacts.js';

export async function setupServer() {
    try {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors({origin: '*'}));
    app.use(PinoHttp());




    app.get('/contacts', async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.status(200)
        .json({data: contacts,
            message: "Successfully found contacts!"
         });
    } catch (error) {
        res.status(404).json({ message: 'Not found' });
        console.log(error)
    }
    });

    app.get('/contacts/:id', async(req, res) => {
        try {
            const contactId = req.params.id;
            const contact = await getContactById(contactId);
            res.status(200).json({data: contact, message:"Successfully found contact!"});
        } catch (error) {
            res.status(404).json({ message: 'Not found' });
            console.log(error)
        }
    })

    app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
    });
    app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server started on port ${PORT}`);
    });

    } catch (error) {
        console.error(error);
    }

}





