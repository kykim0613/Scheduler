import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, onSnapshot } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import { MemoState } from "../atom"
import { dbService, storageService } from "../fireB"
import { v4 } from "uuid"

const SubmitWrapper = styled.div`
    width: 500;
    height: 50px;
    border: 1px solid black;
    background-color: white;
    margin-top: -4px;
`
const SubmitForm = styled.form`
    width: 180px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0%;
`
const ConfirmBtn = styled.input`
    width: 60px;
    height:30px;
    margin: 0 8px;
    border-radius: 8px;
    background-color: #5078dc;
    color: #fff;
    border: none;
    cursor: pointer;
`
const CancleBtn = styled.input`
    width: 60px;
    height:30px;
    margin: 0 8px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`

function MemoBtn({ onSubmit, onClose }: any) {
    // const getStates = async () => {
    //     const q = query(collection(dbService, "states"));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         const memoObj = {
    //             ...doc.data(),
    //             id: doc.id,
    //             createId: 123123
    //         }
    //     })
    // }
    // useEffect(() => {
    //     getStates()
    //     const q = query(
    //         collection(dbService, "states"),
    //         orderBy("createdAt", "desc")
    //     );
    //     onSnapshot(q, (snaphot) => {
    //         const memoArray = snaphot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data()
    //         }));
    //     })
    // })

    return (
        <>
            <SubmitWrapper>
                <SubmitForm onSubmit={onSubmit}>
                    <ConfirmBtn type="submit" value="저장" />
                    <CancleBtn type="submit" onClick={onClose} value="취소" />
                </SubmitForm>
            </SubmitWrapper>
        </>
    )
}

export default MemoBtn;