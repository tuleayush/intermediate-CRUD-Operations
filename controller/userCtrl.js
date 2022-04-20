const User = require('../models/userModel')
const Purchase = require('../models/excelPurchaseModel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const { options } = require('../routes/users')

const xlsx = require('xlsx')
const { render } = require('express/lib/response')
const Exceljs = require('exceljs')
const { db } = require('../models/userModel')

var wb = xlsx.readFile('cust.xlsx', { cellDates: true })


const userCtrl = {

    getAllUser: async (req, res) => {
        try {

            const option = {
                page: req.query.page || 1,
                limit: req.query.limit || 10
            }

            const agr = []
            return res.json(option)
        } catch (err) {
            console.log(err); 
        }
    },
    //client technology
    insertRegister: async (req, res) => {
        try {

            const { name, email, mobile, technology, password ,img } = req.body
            var passwordHash = await bcrypt.hash(password, 10)
            console.log(passwordHash);
            const user = new User({ name, email, mobile, technology, password: passwordHash , img})
            const token = await generateAuthToken({ id: user.id })
            await user.save()
            res.send('registered')
            console.log("registered")

        } catch (error) {
            console.log(error);
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const isUser = await User.findOne({ email: email,password:password })
            if (!isUser) return res.status(400).json({ msg: "invalid login" })
            else {
                const passMatch = await bcrypt.compare(password, isUser.password)
                const token = await generateAuthToken({ _id: isUser._id })
                if (!passMatch) return res.status(400).json({ msg: "incorrect password" })
                res.json({ msg: 'loginsucessful', token })
            }
        } catch (err) {
            console.log(err)
        }
    },
    logedOut: async (req, res) => {
        try {
            res.clearCookie('log')
            res.send("logout sucessfully")
            req.user.save()

        } catch (err) {
            res.status(400).send(err)
        }
    },
    // getAcessToken: async (req, res) => {
    //     try {
    //         const ref_token = req.cookies.log
    //         // res.status(200).json({ msg: "get login token" })
    //         if (!ref_token) return res.status(400).json({ msg: "invalid token" })

    //         jwt.verify(ref_token, process.env.SECRET_KEY, (err, user) => {
    //             if (err) return res.status(400).json({ msg: "invalid authantication" })

    //             const access_token = generateAuthToken({ id: user._id })

    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }


    // },

    getId: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)

            await res.json(user)
        } catch (err) {
            console.log(err);
        }

    },
    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            const { name, email, mobile, technology } = req.body

            user.name = name
            user.email = email
            user.mobile = mobile
            user.technology = technology

            const updateUser = await user.save(() => {
                res.send('user updated')
            })
            res.json(updateUser)
        } catch (err) {
            res.status(400).json({ msg: 'not updated' })
            console.log(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            await user.remove()
            res.send('user deleted')
        } catch (error) {
            res.send('user not deleted')
            console.log(err)
        }
    },
    profileUpload: async (req, res) => {
        try {
            res.json({ msg: "uploaded" })
        } catch (error) {
            console.log(error)
        }
    },
    xlsx: async (req, res) => {
        try {
            var sheetName = wb.SheetNames[0].trim()

            var sheetValue = wb.Sheets[sheetName]
            // sheetValue = sheetValue
            var exleData = xlsx.utils.sheet_to_json(sheetValue)

            for (let index = 0; index < exleData.length; index++) {
                exleData[index];
                const check = await Purchase.find({ name: exleData[index].name })
               

                if (check.length > 0) { } else {
                    await Purchase.create(exleData)
                }
            }

        } catch (error) {
            console.log(error)

        }
    },
    convert: async (req, res) => {
        try {
            const cust = await (Purchase.find())

            console.log(cust);
            const workbook = await new Exceljs.Workbook()
            const worksheet = await workbook.addWorksheet('customer')

            worksheet.columns = [
                { header: "_id", key: '_id' },
                { header: "name", key: 'name' },
                { header: "purchaseDate", key: 'purchaseDate' },
                { header: "paid", key: 'paid' },
                { header: "price", key: 'price' },
                { header: "quantity", key: 'quantity' },

            ]
            // let count=1
            cust.forEach(c => {
                worksheet.addRow(c)

            })
            const data = await workbook.xlsx.writeFile('user.xlsx')

        } catch (err) {
            res.status(400).json({ err })
            console.log(err);
        }

    },
}


const generateAuthToken = async function (payload) {
    try {
        const token = jwt.sign({ payload }, process.env.SECRET_KEY)
        return token
    } catch (err) {
        console.log(err);
    }
}

module.exports = userCtrl
