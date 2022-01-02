
import * as Yup from 'yup';

const updateSchema = {
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Name is required"),
    birth_date: Yup.date().required('Birth date is required'),
    email: Yup.string().email("Invalid email address format").required("Email is required"),
    password: Yup.string().min(8, "Password must be 3 characters at minimum"),
    phone: Yup.string(),
    identity: Yup.string().required("Id card number is required"),
    passport_number: Yup.string()
  }

const createSchema = {
    ...updateSchema,
    ...{ password: updateSchema.password.required("Password is required") }
}

export const getUserSchema = (user) => {
    return Yup.object().shape(user.id ? updateSchema : createSchema);
} 
export const userProps = {
    id: {
        label: 'Id',
        inputType: '',
        editable: false,
        hidden: false,
    },
    name: {
        label: 'Name',
        inputType: 'text',
        editable: true,
        hidden: false,
    },
    surname: {
        label: 'Last Name',
        inputType: 'text',
        editable: true,
        hidden: false,
    },
    birth_date: {
        label: 'Birth Date',
        inputType: 'date',
        editable: true,
        hidden: false,
    },
    email: {
        label: 'Email',
        inputType: 'email',
        editable: true,
        hidden: false,
    },
    password: {
        label: 'Password',
        inputType: 'password',
        editable: true,
        hidden: true,
    },
    phone: {
        label: 'Phone Number',
        inputType: 'phone',
        editable: true,
        hidden: false,
    },
    identity: {
        label: 'Id Card Number',
        inputType: 'text',
        editable: true,
        hidden: false,
    },
    passport_number: {
        label: 'Passport Number',
        inputType: 'text',
        editable: true,
        hidden: false,
    },
}

export const getFullName = ({name, surname}) => {
    return `${name} ${surname}`;
}

export const parseUser = (user) => {
    return {
        ...user,
        ...{
            password: '',
            birth_date: new Date(user.birth_date).toISOString().split('T')[0]
        }
    }
}


export const getEditableUserProps = () => {
    return Object.entries(userProps).filter(([k, {editable}]) => editable);
}

export const getVisibleUserProps = () => {
    return Object.entries(userProps).filter(([k, {hidden}]) => !hidden);
}