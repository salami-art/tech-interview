
import { getFullName } from '../utils/user';
import './ListUser.css'

const ListUser = ({
    id,
    name,
    surname,
    onUserSelected,
    active
}) => {
    return (
        <li className={["users_list_item", active ? 'active' : ''].join(' ')}>
            <button
                type="button"
                title={getFullName({name, surname})}
                onClick={ () => onUserSelected(id)}
            >
                {getFullName({name, surname})}
            </button>
        </li>
    )
}

export default ListUser;