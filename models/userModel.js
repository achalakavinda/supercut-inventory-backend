const Sequelize = require('sequelize');
const sequelize = require('../sequelizeserver');
const bcrypt = require('bcryptjs');

const Company = require('./companyModel');
const CompanyDivision = require('./companyDivisionModel');

const Model = Sequelize.Model;
class User extends Model {

    async correctPassword(candidatePassword, userPassword) {
        return await bcrypt.compare(candidatePassword, userPassword);
    }
    async changedPasswordAfter(JWTTimeStamp) {
        if (this.passwordChangedAt) {
            const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
            return JWTTimeStamp < changedTimeStamp;
        } else {
            return false;
        }
    }
}

User.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            isLowercase: true,
        }
    },
    photo: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [8, 12]
        }
    },
    passwordConfirm: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "PWC",
        validate: {
            len: [8, 12],
            isConfirmPasswordTrue(elm) {
                if (elm !== this.password) {
                    throw new Error('Passwords are not the same!');
                }
            }
        }
    },
    passwordChangedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Company,
            key: 'id'
        }
    },
    company_division_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: CompanyDivision,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'user'
});

User.addHook('beforeCreate', async (user) => {
    if (!user.changed('password')) {
        return next();
    } else {
        //hash the pw with salt rounds 12
        user.password = await bcrypt.hash(user.password, 12); // this will be a bit computational intensive so we will use this async version 
        user.passwordConfirm = undefined;// we only needed this to validation and no point keeping this.
    }
});

module.exports = User; 