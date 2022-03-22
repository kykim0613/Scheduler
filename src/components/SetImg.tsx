import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import styled from "styled-components";
import { authService, dbService, storage } from "../fireB";

const Wrapper = styled.div`
    width: 100%;
`
const ImgWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.2;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
`
const BgImg = styled.img`
    width: 100%;
    height: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: fit-content;
    min-height: fit-content;
    z-index: -2;
`

function SetImg() {
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event: any) => {
        event.prventDefault();
        let attachmentUrl = "";
        if (attachmentUrl != "") {
            const fileRef = ref(storage, `id`)
            const response = await uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const posting = {
            createAt: Date.now(),
            attachmentUrl
        }
        await addDoc(collection(dbService, "bgImg"), posting);
        setAttachment("");
    }
    const onFileChange = (event: any) => {
        const {
            target: {files},
        } = event;
        const theFile = files[0]
        const reader = new FileReader();
        reader.onloadend = (finishedEvent: any) => {
            const {
                currentTarget: {result}
            } = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }
    console.log(attachment)
    return(
        <Wrapper>
            <form onSubmit={onSubmit}>
        <input type="file" accept="image/*" onChange={onFileChange}/>
        </form>
        {attachment && <><BgImg src={attachment} /></>}
        </Wrapper>
    )
}

export default SetImg;