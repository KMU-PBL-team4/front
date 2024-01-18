import CardContainer from "../components/cardContainer";

import "../styles/components/searchForm.css"
import "../App.css"

import React, { useState } from 'react';
import AdModal from "../components/adModal";
import TestModal from "../components/testModal";


const MainPage = () => {

    const [modalShow, setModalShow] = useState(false);
    const [testModalShow, setTestModalShow] = useState(false);

    return (
        <>
            <div className="main-buttons">
                <button variant="primary" onClick={() => setModalShow(true)}>
                    광고 추가
                </button>
                <AdModal show={modalShow} onHide={() => setModalShow(false)} />

                <button variant="primary" onClick={() => setTestModalShow(true)}>
                    광고 테스트
                </button>

                <TestModal show={testModalShow} onHide={() => setTestModalShow(false)} />
            </div>
            <CardContainer cardTitle="무적4팀" />
        </>
    )
}


export default MainPage;