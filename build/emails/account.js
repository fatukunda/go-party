'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
    value: true
})
exports.sendActivationEmail = void 0

var _mail = _interopRequireDefault(require('@sendgrid/mail'))

// eslint-disable-next-line no-undef
_mail['default'].setApiKey(process.env.SENDGRID_API_KEY)

var sendActivationEmail = function sendActivationEmail(email, username, activationLink) {
    _mail['default'].send({
        to: email,
        from: 'fatukunda@gmail.com',
        subject: 'Welcome to Go Party',
        html: 'Hello '.concat(username, ', Please click on this link to confirm your email. <a href=').concat(activationLink, '>').concat(activationLink, '</a>')
    })
};

exports.sendActivationEmail = sendActivationEmail
//# sourceMappingURL=account.js.map