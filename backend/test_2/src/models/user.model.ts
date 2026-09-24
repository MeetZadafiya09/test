import { DataTypes, Model, ModelStatic, Optional, Sequelize } from "sequelize";
import { ERRORS_NAME } from "../lib/errors.js";
import { EMAIL_REGEX, OTP_VERIFY_TYPE, PASSWORD_HASH_SALT, USER_STATUS } from "../lib/constants.js";
import bcrypt from "bcryptjs";

interface UserAttributes {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    is_email_verified: boolean;
    otp: string | null;
    otp_expire_at: Date | null;
    otp_type: string | null;
    status: string;
    email_verified_at: Date | null;
}

type UserCreationAttributes = Optional<
    UserAttributes,
    "id" | "is_email_verified" | "otp" | "otp_expire_at" | "otp_type" | "status" | "email_verified_at"
>;

interface UserInstanceMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserInstance = Model<UserAttributes, UserCreationAttributes> & UserAttributes & UserInstanceMethods;

const Users = (sequelize: Sequelize, dataTypes: typeof DataTypes): ModelStatic<UserInstance> => {
    const UserModel = sequelize.define<UserInstance>('users', {
        id: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            primaryKey: true,
        },
        first_name: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: ERRORS_NAME.USER.FIRST_NAME_REQUIRED,
                },
                notEmpty: {
                    msg: ERRORS_NAME.USER.FIRST_NAME_REQUIRED,
                },
                len: {
                    args: [2, 100],
                    msg: ERRORS_NAME.USER.FIRST_NAME_LENGTH_INVALID,
                },
            },
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: ERRORS_NAME.USER.LAST_NAME_REQUIRED,
                },
                notEmpty: {
                    msg: ERRORS_NAME.USER.LAST_NAME_REQUIRED,
                },
                len: {
                    args: [2, 100],
                    msg: ERRORS_NAME.USER.LAST_NAME_LENGTH_INVALID,
                },
            },
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: ERRORS_NAME.USER.EMAIL_REQUIRED,
                },
                notEmpty: {
                    msg: ERRORS_NAME.USER.EMAIL_REQUIRED,
                },
                is_valid_email: (value: string) => {
                    if (!EMAIL_REGEX.test(value)) {
                        throw new Error(ERRORS_NAME.USER.EMAIL_INVALID);
                    }
                }
            },
            unique: {
                name: "users_email_unique",
                msg: ERRORS_NAME.USER.EMAIL_EXISTS,
            },
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: ERRORS_NAME.USER.PASSWORD_REQUIRED,
                },
                notEmpty: {
                    msg: ERRORS_NAME.USER.PASSWORD_REQUIRED,
                },
            },
        },
        is_email_verified: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
        },
        otp: {
            type: dataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        otp_expire_at: {
            type: dataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        otp_type: {
            type: dataTypes.ENUM(...Object.values(OTP_VERIFY_TYPE) as [string, ...string[]]),
            allowNull: true,
            defaultValue: null

        },
        status: {
            type: dataTypes.ENUM(...Object.values(USER_STATUS) as [string, ...string[]]),
            allowNull: false,
            defaultValue: USER_STATUS.ACTIVE,
            validate: {
                notNull: {
                    msg: ERRORS_NAME.USER.STATUS_REQUIRED,
                },
                notEmpty: {
                    msg: ERRORS_NAME.USER.STATUS_REQUIRED,
                },
            },
        },
        email_verified_at: {
            type: dataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    }, {
        tableName: "users",
        timestamps: true,
        underscored: true
    });
    UserModel.beforeSave(async (user: UserInstance) => {
        if (!user.changed('password') || !user.password) {
            return;
        }
        user.password = await bcrypt.hash(
            user.password,
            PASSWORD_HASH_SALT
        );
    });
    (UserModel.prototype as UserInstance).comparePassword = async function (
        this: UserInstance,
        candidatePassword: string
    ): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    };
    return UserModel;
};

export default Users;