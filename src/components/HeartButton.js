import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { IoIosHeartEmpty, IoIosHeart} from "react-icons/io";
import { actionCreators as likeActions} from "../redux/modules/like";
import { useDispatch } from "react-redux";


const HeartButton = ({like, onClick},props) => {
    const dispatch = useDispatch();

    if(like) {
        return (
            <Heart onClick ={onClick}>
                <IoIosHeart cursor="pointer"
                onClick={() => {
                    dispatch(likeActions.changeLikeBoardDB(props.boardId))
                }}/>
            </Heart>

        )
    }
    return(
        <Heart onClick ={onClick}>
            <IoIosHeartEmpty cursor="pointer"
            onClick={() => {
                dispatch(likeActions.changeLikeBoardDB(props.boardId))
            }}/>
        </Heart>
    )
}

const Heart = styled.div`

`;

export default HeartButton;