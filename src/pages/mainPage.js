import CardContainer from "../components/cardContainer";
import SearchForm from "../components/searchForm";

import "../styles/components/searchForm.css"
import "../App.css"
import { AddModal, TestModal } from "../components/modal";

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';




const MainPage = () => {

    const [modalShow, setModalShow] = useState(false);
    const [testModalShow, setTestModalShow] = useState(false);

    return (
        <>
            <div className="main-buttons">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    광고 추가
                </Button>

                <AddModal show={modalShow} onHide={() => setModalShow(false)} />

                <Button variant="primary" onClick={() => setTestModalShow(true)}>
                    광고 테스트
                </Button>

                <TestModal show={testModalShow} onHide={() => setTestModalShow(false)} />
            </div>
            <CardContainer cardTitle="무적4팀" />
        </>
    )
}


export default MainPage;