import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";
import { likeApi } from '../../shared/api'
import axios from "axios";

const TOGGLE_LIKE = "TOGGLE_LIKE"; // 좋아요 토글

const toggleLike = createAction(TOGGLE_LIKE, (liked) => ({ liked }));

const initialState = {

  mainLikeList: [],
  myList: [],
  eachList: [],
  likeList: [],
};

const toggleLikeMD = (boardId, liked) => {
  return (dispatch, getState, { history }) => {
    if (!liked) {
        likeApi
        .likePost(boardId)
        .then((res) => {
          const likeStatus = res.data.existLike;
          dispatch(toggleLike(likeStatus));
          // console.log("좋아요 반영 성공", res.data);
        })
        .catch((err) => {
          // console.log("좋아요 반영 오류", err);
        });
    } else {
      axios({
        method: "DELETE",
        url: `http://52.78.155.185/api/board/${boardId}/like`,
        data: {},
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-type': 'application/json; charset=UTF-8',
            accept: 'application/json',
        },
      })
        .then((res) => {
        //   const likeStatus = res.data.existLike;
        //   dispatch(toggleLike(likeStatus));
          console.log("좋아요 반영 성공", res.data);
        })
        .catch((err) => {
          console.log("좋아요 반영 오류", err);
        });
    }
  };
};

export default handleActions(
  {
    [TOGGLE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action);
        draft.liked = action.payload.liked;
      }),


  },
  initialState
);

const actionCreators = {
  toggleLike,
  toggleLikeMD,
  
};

export { actionCreators };