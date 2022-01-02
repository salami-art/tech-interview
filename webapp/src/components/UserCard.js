import { Fragment, useEffect, useState } from "react";
import { getFullName, getVisibleUserProps } from "../utils/user";
import UserForm from "./UserForm";
import './UserCard.css'
import { deleteUser } from "../api/userApi";

const promptDelete = (user) => {
    
    if (window.confirm(`Are you sure you want to delete the user ${getFullName(user)} ?`))
        deleteUser(user.id).then( deleted => {
            if (window.confirm(`User was successfully deleted`))
                window.location.reload()
        })
}

const UserCard = ({user, editingMode}) => {
    const [isEditing, setEditingMode] = useState(false);
    const fullName = !!user ? getFullName(user) : null;
    useEffect(() => { 
        setEditingMode(editingMode)
    },[user, editingMode])
    return (
        <div className="user_card">
            <h3>{isEditing && "Editing user : "}{fullName}</h3>
            {isEditing ? <UserForm {...{user, ...{setEditingMode}}}/> : <>
                <dl>
                    {getVisibleUserProps()
                        .map(([k, {label}]) => 
                            <Fragment key={`user_card_${k}`}>
                                <dt>{label}</dt>
                                <dd>{user[k]}</dd>
                            </Fragment>
                    )}
                </dl>
                <div className="user_card_footer">
                    <button
                        type="button"
                        title="Edit"
                        onClick={ () => setEditingMode(true)}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        title="Delete"
                        onClick={ () => promptDelete(user)}
                    >
                        Delete
                    </button>
                </div>
            </>}
        </div>
    )
}

export default UserCard