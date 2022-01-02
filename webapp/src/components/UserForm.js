import { Formik, Field, Form, ErrorMessage } from "formik";
import { Fragment } from "react";
import { createUser, updateUser } from "../api/userApi";
import { getEditableUserProps, getUserSchema} from "../utils/user";
import './UserForm.css'

const handleSubmit = (user) => {
    const {id, ...userData} = user;
    return !id ? createUser(userData) : updateUser(id, userData)
}

const UserForm = ({user, setEditingMode}) => {
    const validationSchema = getUserSchema(user);
    
    return user && 
        <Formik
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                await handleSubmit(values);
                window.location.reload();
            }}
        >
            {({ touched, errors, isSubmitting, values }) => 

                <Form>
                    {isSubmitting && 'Loading ...'}
                    <dl>
                        {getEditableUserProps()
                            .map(([k, {label, inputType}]) => 
                                <Fragment key={`user_card_${k}`}>
                                    <dt>{label}</dt>
                                    <dd>
                                        <Field 
                                            name={k}
                                            type={inputType}
                                            placeholder={label}
                                            autoComplete="off"
                                            className={touched[k] && errors[k] ? "is-invalid" : ""}
                                        />
                                        <div className="error-wrapper">
                                            <ErrorMessage
                                                component="div"
                                                name={k}
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    </dd>
                                </Fragment>
                        )}
                    </dl>

                    <div className="user_card_footer">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={ () => setEditingMode(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </Form>
            }
        </Formik>
}

export default UserForm