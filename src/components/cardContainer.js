import "../styles/plugins/fontawesome-free/css/all.min.css"
import "../styles/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"
import "../styles/plugins/datatables-responsive/css/responsive.bootstrap4.min.css"
import "../styles/plugins/datatables-buttons/css/buttons.bootstrap4.min.css"
import "../styles/dist/css/adminlte.min.css?v=3.2.0"

// import Pagination from 'react-bootstrap/Pagination';

import "../styles/components/cardContainer.css"
import { useState } from "react"
import axios from "axios"
import { AddModal, DeleteModal, EditModal } from "./modal";
import SearchForm from "./searchForm"

const itemsPerPage = 5;
const cardexample = {
    idx: 1,
    title: '현대차',
    subheading: '멋있는이벤트',
    ExposureDatetime1: new Date().getTime(),
    ExposureDatetime2: new Date().getTime(),
    count: 100,
    regdate: Date.now(),
}
const CardContainer = (props) => {

    let [cards, setCards] = useState([cardexample, cardexample, cardexample, cardexample, cardexample, cardexample])

    // 페이지 상태와 현재 페이지의 아이템을 계산합니다.
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    function getCategory() {
        axios.get('/neighbor-ad/get-add-list')
            .then((result) => {
                setCards(result.data);
            });
    }

    return (
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header1">
                                <span class="card-title">{props.cardTitle} 님의 광고 목록입니다.</span>
                                <SearchForm></SearchForm>
                            </div>

                            <div class="card-body">
                                <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>idx</th>
                                            <th>title</th>
                                            <th>text</th>
                                            <th>Exposure datetime</th>
                                            <th>count</th>
                                            <th>regdate</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((a, item) => (
                                            <Card
                                                {...cards[item]}
                                            ></Card>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="pagination">
                                    <div className="pagination-buttons">
                                        {/* 페이지네이션을 표시합니다. */}
                                        {Array.from({ length: Math.ceil(cards.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                                            pageNumber == currentPage
                                                ? <button className="pagination-selected" key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
                                                    {pageNumber}
                                                </button>
                                                : <button className="pagination-not-selected" key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
                                                    {pageNumber}
                                                </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}



const Card = (props) => {
    let ExposureDatetime10 = new Date(props.ExposureDatetime1);
    let ExposureDatetime20 = new Date(props.ExposureDatetime2);
    let NewRegDate = new Date(props.regdate)

    const dateFormat = (date) => {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
        second = second >= 10 ? second : '0' + second;

        return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [detailModalShow, setDetailModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    return (
        <tr>
            <td>{props.idx}</td>
            <td>{props.title}</td>
            <td>{props.subheading}</td>
            <td>{`${dateFormat(ExposureDatetime10)} ~ ${dateFormat(ExposureDatetime20)}`}</td>
            <td>{props.count}</td>
            <td>{dateFormat(NewRegDate)}</td>
            <td className="table-actions">
                <div>
                    <button onClick={() => setDetailModalShow(true)}>상세</button>

                    {/* <DetailModal show={detailModalShow} onHide={() => setDetailModalShow(false)} /> */}
                </div>
                <div>
                    <button onClick={() => setEditModalShow(true)}>수정</button>

                    <EditModal
                        show={editModalShow}
                        onHide={() => setEditModalShow(false)}
                        title="하나둘"
                        subheading="작은설명들"
                        startExposure="2018-06-12T19:30"
                        endExposure="2024-06-12T19:30"
                        count="1000"
                        detail="디테일한자세한설명들"
                    />
                </div>
                <div>
                    <button onClick={() => setDeleteModalShow(true)}>삭제</button>

                    <DeleteModal
                        show={deleteModalShow}
                        onHide={() => setDeleteModalShow(false)}

                        title={cardexample.title}
                        subheading={cardexample.subheading}
                        writeDate={'12.12.03'}
                    />
                </div>
            </td>
        </tr>

    )
}



export default CardContainer;