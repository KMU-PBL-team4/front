import "../styles/plugins/fontawesome-free/css/all.min.css"
import "../styles/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"
import "../styles/plugins/datatables-responsive/css/responsive.bootstrap4.min.css"
import "../styles/plugins/datatables-buttons/css/buttons.bootstrap4.min.css"
import "../styles/dist/css/adminlte.min.css?v=3.2.0"

import "../styles/components/cardContainer.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { AddModal, DeleteModal, EditModal } from "./modal";
import SearchForm from "./searchForm"
import AdModal from "./adModal"

const itemsPerPage = 5;
const cardexample2 = [
    {
        "id": 1,
        "title": "제품1",
        "shortHeading": "제품1 소개",
        "startExposure": 1705374000000,
        "endExposure": 1705460400000,
        "count": 100,
        "regDate": 1705380058000,
        "description": "제품1에 대한 설명입니다."
    },
    {
        "id": 2,
        "title": "서비스2",
        "shortHeading": "서비스2 소개",
        "startExposure": 1705559400000,
        "endExposure": 1705743900000,
        "count": 50,
        "regDate": 1705380058000,
        "description": "서비스2에 대한 설명입니다."
    }
]



const CardContainer = (props) => {

    let [cards, setCards] = useState(cardexample2)

    // 페이지 상태와 현재 페이지의 아이템을 계산합니다.
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function getCards() {
        axios.get('/neighbor-ad/ad-list')
            .then((result) => {
                setCards(result.data);
            });
    }

    // useEffect(() => {
    //     getCards();
    // }, [])

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
                                            <th>id</th>
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
    let startExposureTime = new Date(props.startExposure);
    let endExposureTime = new Date(props.endExposure);
    let NewRegDate = new Date(props.regDate)

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
            <td>{props.id}</td>
            <td>{props.title}</td>
            <td>{props.shortHeading}</td>
            <td>{`${dateFormat(startExposureTime)} ~ ${dateFormat(endExposureTime)}`}</td>
            <td>{props.count}</td>
            <td>{dateFormat(NewRegDate)}</td>
            <td className="table-actions">
                <div>
                    <button onClick={() => setDetailModalShow(true)}>상세</button>

                    {/* <DetailModal show={detailModalShow} onHide={() => setDetailModalShow(false)} /> */}
                </div>
                <div>
                    <button onClick={() => setEditModalShow(true)}>수정</button>

                    <AdModal
                        isEdit={true}
                        propsFormData={props}

                        show={editModalShow}
                        onHide={() => setEditModalShow(false)}
                    />
                </div>
                <div>
                    <button onClick={() => setDeleteModalShow(true)}>삭제</button>

                    <DeleteModal
                        show={deleteModalShow}
                        propsFormData={props}
                        onHide={() => setDeleteModalShow(false)}

                        // title={cardexample2[0].title}
                        // shortHeading={cardexample2[0].shortHeading}
                        // writeDate={'12.12.03'}
                    />
                </div>
            </td>
        </tr>

    )
}



export default CardContainer;