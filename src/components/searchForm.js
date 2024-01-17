import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


const SearchForm = () => {
    return (
        <div className='search-div'>
            <form className='search' method="GET" action="/neighbor-ad/ad-list">
                <select name='category'>
                    <option>영상</option>
                    <option>사진</option>
                    <option>텍스트</option>
                </select>
                <input type='text' name='contents'></input>
                <button type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form >
        </div>
    )
}


export default SearchForm;