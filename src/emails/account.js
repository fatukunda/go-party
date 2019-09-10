import sgMail from '@sendgrid/mail'

// eslint-disable-next-line no-undef
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendActivationEmail = (email, username, activationLink) => {
    sgMail.send({
        to: email,
        from: 'fatukunda@gmail.com',
        subject: 'Welcome to Go Party',
        html: `Hello ${username}, Please click on this link to confirm your email. <a href=${activationLink}>${activationLink}</a>`
    })
}

export { sendActivationEmail }
