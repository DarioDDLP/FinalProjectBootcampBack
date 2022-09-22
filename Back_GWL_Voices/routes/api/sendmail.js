const router = require('express').Router();
const { transporter } = require('../../config/mailer');
const User = require('../../models/users.model');

router.post('/', async (req, res) => {
    const { mailto, subject, text } = req.body;
    const { email } = req.user;
    console.log(mailto, subject, text);
    try {
        await transporter.sendMail({
            from: `${email}`, // sender address
            to: mailto, // list of receivers
            subject: subject, // Subject line
            // text: "Hello world?", // plain text body
            html: `<h1>${subject}</h1><p>${text}</p>`, // html body
        });
        res.status(200).json({ ok: 'mail has been send' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

router.post('/:idReceiver', async (req, res) => {
    const { idReceiver } = req.params;
    const { id } = req.user;
    const { subject, text } = req.body
    try {
        const receiver = await User.getById(idReceiver);
        const emitter = await User.getById(id)
        await transporter.sendMail({
            from: `${emitter.name} ${emitter.surname}`, // sender address
            to: `${receiver.email}`, // list of receivers
            subject: subject, // Subject line
            // text: "Hello world?", // plain text body
            html: `<h1>${emitter.name} ${emitter.surname} has sent you a message</h1><p>${req.body.text}</p>`, // html body
        });
        res.json({ success: 'email has been sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

})


module.exports = router;