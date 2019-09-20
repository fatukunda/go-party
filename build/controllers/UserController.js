'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
    value: true
})
exports['default'] = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'))

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'))

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'))

var _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'))

var _UserService = _interopRequireDefault(require('../services/UserService'))

var _Utils = _interopRequireDefault(require('../utils/Utils'))

var _multer = require('../middleware/multer')

var _cloudinaryConfig = require('../config/cloudinaryConfig')

var _account = require('../emails/account')

var util = new _Utils['default']()

var UserController =
/*#__PURE__*/
function () {
    function UserController() {
        (0, _classCallCheck2['default'])(this, UserController)
    }

    (0, _createClass2['default'])(UserController, null, [{
        key: 'addUser',
        value: function () {
            var _addUser = (0, _asyncToGenerator2['default'])(
                /*#__PURE__*/
                _regenerator['default'].mark(function _callee(req, res) {
                    var _req$body, username, email, password, user, createdUser, token, activationLink, userData

                    return _regenerator['default'].wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                            case 0:
                                _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password
                                user = req.body

                                if (!(!username || !email || !password)) {
                                    _context.next = 5
                                    break
                                }

                                util.setError(400, 'Username, email, and password are required.')
                                return _context.abrupt('return', util.send(res))

                            case 5:
                                _context.prev = 5
                                _context.next = 8
                                return _UserService['default'].addUser(user)

                            case 8:
                                createdUser = _context.sent
                                token = util.generateAuthToken(createdUser.id)
                                activationLink = ''.concat(req.protocol, '://').concat(req.hostname, ':8000').concat(req.baseUrl, '/confirmation/').concat(token); // Send a welcome email to the user

                                (0, _account.sendActivationEmail)(createdUser.email, createdUser.username, activationLink)
                                userData = {
                                    user: createdUser,
                                    token: token
                                }
                                util.setSuccess(201, 'User created!', userData)
                                return _context.abrupt('return', util.send(res))

                            case 17:
                                _context.prev = 17
                                _context.t0 = _context['catch'](5)
                                util.setError(400, _context.t0.message)
                                return _context.abrupt('return', util.send(res))

                            case 21:
                            case 'end':
                                return _context.stop()
                            }
                        }
                    }, _callee, null, [[5, 17]])
                }))

            function addUser(_x, _x2) {
                return _addUser.apply(this, arguments)
            }

            return addUser
        }()
    }, {
        key: 'verifyAccount',
        value: function () {
            var _verifyAccount = (0, _asyncToGenerator2['default'])(
                /*#__PURE__*/
                _regenerator['default'].mark(function _callee2(req, res) {
                    var token, data
                    return _regenerator['default'].wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0
                                token = req.params.token // eslint-disable-next-line no-undef

                                data = _jsonwebtoken['default'].verify(token, process.env.JWT_KEY)
                                _context2.next = 5
                                return _UserService['default'].verifyAccount(data.id)

                            case 5:
                                util.setSuccess(200, 'Account activated successfully!')
                                return _context2.abrupt('return', util.send(res))

                            case 9:
                                _context2.prev = 9
                                _context2.t0 = _context2['catch'](0)
                                util.setError(400, _context2.t0.message)
                                return _context2.abrupt('return', util.send(res))

                            case 13:
                            case 'end':
                                return _context2.stop()
                            }
                        }
                    }, _callee2, null, [[0, 9]])
                }))

            function verifyAccount(_x3, _x4) {
                return _verifyAccount.apply(this, arguments)
            }

            return verifyAccount
        }()
    }, {
        key: 'uploadAvatar',
        value: function () {
            var _uploadAvatar = (0, _asyncToGenerator2['default'])(
                /*#__PURE__*/
                _regenerator['default'].mark(function _callee3(req, res) {
                    var file, result, avatarUrl, user
                    return _regenerator['default'].wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!req.file) {
                                    _context3.next = 18
                                    break
                                }

                                file = (0, _multer.dataUri)(req).content
                                _context3.prev = 2
                                _context3.next = 5
                                return _cloudinaryConfig.uploader.upload(file)

                            case 5:
                                result = _context3.sent
                                avatarUrl = result.url
                                _context3.next = 9
                                return _UserService['default'].uploadAvatar(req.user.id, avatarUrl)

                            case 9:
                                user = _context3.sent
                                util.setSuccess(200, 'Avatar Uploaded successfully!', user)
                                return _context3.abrupt('return', util.send(res))

                            case 14:
                                _context3.prev = 14
                                _context3.t0 = _context3['catch'](2)
                                util.setError(400, _context3.t0.message)
                                return _context3.abrupt('return', util.send(res))

                            case 18:
                            case 'end':
                                return _context3.stop()
                            }
                        }
                    }, _callee3, null, [[2, 14]])
                }))

            function uploadAvatar(_x5, _x6) {
                return _uploadAvatar.apply(this, arguments)
            }

            return uploadAvatar
        }()
    }, {
        key: 'findByCredentials',
        value: function () {
            var _findByCredentials = (0, _asyncToGenerator2['default'])(
                /*#__PURE__*/
                _regenerator['default'].mark(function _callee4(req, res) {
                    var _req$body2, username, password, user, token, userData

                    return _regenerator['default'].wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                            case 0:
                                _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password

                                if (!(!username || !password)) {
                                    _context4.next = 4
                                    break
                                }

                                util.setError(400, 'Username and password are required.')
                                return _context4.abrupt('return', util.send(res))

                            case 4:
                                _context4.prev = 4
                                _context4.next = 7
                                return _UserService['default'].findByCredentials(username, password)

                            case 7:
                                user = _context4.sent
                                token = util.generateAuthToken(user.id)
                                userData = {
                                    user: user,
                                    token: token
                                }
                                util.setSuccess(200, 'Logged in successfully!', userData)
                                return _context4.abrupt('return', util.send(res))

                            case 14:
                                _context4.prev = 14
                                _context4.t0 = _context4['catch'](4)
                                util.setError(400, _context4.t0.message)
                                return _context4.abrupt('return', util.send(res))

                            case 18:
                            case 'end':
                                return _context4.stop()
                            }
                        }
                    }, _callee4, null, [[4, 14]])
                }))

            function findByCredentials(_x7, _x8) {
                return _findByCredentials.apply(this, arguments)
            }

            return findByCredentials
        }()
    }, {
        key: 'fetchUserProfile',
        value: function () {
            var _fetchUserProfile = (0, _asyncToGenerator2['default'])(
                /*#__PURE__*/
                _regenerator['default'].mark(function _callee5(req, res) {
                    var user
                    return _regenerator['default'].wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                            case 0:
                                user = req.user
                                user.password = undefined
                                util.setSuccess(200, 'success', user)
                                return _context5.abrupt('return', util.send(res))

                            case 4:
                            case 'end':
                                return _context5.stop()
                            }
                        }
                    }, _callee5)
                }))

            function fetchUserProfile(_x9, _x10) {
                return _fetchUserProfile.apply(this, arguments)
            }

            return fetchUserProfile
        }()
    }, {
        key: 'editUserProfile',
        value: function () {
            var _editUserProfile = (0, _asyncToGenerator2['default'])(
                /*#__PURE__*/
                _regenerator['default'].mark(function _callee6(req, res) {
                    var acceptedOptions, receivedOptions, user, isUpdateOption
                    return _regenerator['default'].wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                            case 0:
                                // Update user profile
                                acceptedOptions = ['username', 'email', 'password', 'bio', 'dob']
                                receivedOptions = Object.keys(req.body)
                                user = req.user
                                isUpdateOption = receivedOptions.every(function (option) {
                                    return acceptedOptions.includes(option)
                                })

                                if (isUpdateOption) {
                                    _context6.next = 7
                                    break
                                }

                                util.setError(400, 'Invalid update options!')
                                return _context6.abrupt('return', util.send(res))

                            case 7:
                                _context6.prev = 7
                                receivedOptions.forEach(function (option) {
                                    return user[option] = req.body[option]
                                })
                                _context6.next = 11
                                return user.save()

                            case 11:
                                user.password = undefined
                                util.setSuccess(200, 'User updated successfully', user)
                                return _context6.abrupt('return', util.send(res))

                            case 16:
                                _context6.prev = 16
                                _context6.t0 = _context6['catch'](7)
                                util.setError(400, _context6.t0.message)
                                return _context6.abrupt('return', util.send(res))

                            case 20:
                            case 'end':
                                return _context6.stop()
                            }
                        }
                    }, _callee6, null, [[7, 16]])
                }))

            function editUserProfile(_x11, _x12) {
                return _editUserProfile.apply(this, arguments)
            }

            return editUserProfile
        }()
    }, {
        key: 'loginFacebookUser',
        value: function () {
            var _loginFacebookUser = (0, _asyncToGenerator2['default'])(
                /*#__PURE__*/
                _regenerator['default'].mark(function _callee7(req, res) {
                    var user
                    return _regenerator['default'].wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                            case 0:
                                try {
                                    user = req.user
                                    util.setSuccess(200, 'Facebook login successful!', user)
                                    util.send(res)
                                } catch (error) {
                                    util.setError(400, error)
                                    util.send(res)
                                }

                            case 1:
                            case 'end':
                                return _context7.stop()
                            }
                        }
                    }, _callee7)
                }))

            function loginFacebookUser(_x13, _x14) {
                return _loginFacebookUser.apply(this, arguments)
            }

            return loginFacebookUser
        }()
    }])
    return UserController
}()

var _default = UserController
exports['default'] = _default
//# sourceMappingURL=UserController.js.map