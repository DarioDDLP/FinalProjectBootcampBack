const router = require('express').Router();
const { transporter } = require('../../config/mailer');
const User = require('../../models/users.model')

router.post('/:idReceiver', async (req, res) => {
    const { idReceiver } = req.params;
    const { id } = req.user;
    const { subject, text } = req.body
    try {
        const receiver = await User.getById(idReceiver);
        const emitter = await User.getById(id)
        await transporter.sendMail({
            from: `${emitter.name} ${emitter.surname}`, // sender address
            to: "thegordosmen@gmail.com", // list of receivers
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