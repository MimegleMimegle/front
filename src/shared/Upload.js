import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as postActions } from "../redux/modules/post";

const Upload = () => {
  const fileInput = React.useRef();
  //   const is_uploading = useSelector((state) => state.image.uploading);
  const dispatch = useDispatch();

  const selectFile = (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.files[0]);
    console.log(fileInput.current.files[0]);

    const reader = new FileReader();
    const selectImage = fileInput.current.files[0];
    console.log(selectImage);
    reader.readAsDataURL(selectImage);

    reader.onloadend = () => {
      const selectedImage = reader.result;
      console.log(selectedImage);

      dispatch(imageActions.setPreview(selectedImage));
      //   dispatch(postActions.addPostDB(selectedImage));
    };
  };

  return (
    <>
      <input
        type="file"
        onChange={selectFile}
        ref={fileInput}
        // disabled={is_uploading}
      />
        <button onClick={Upload}>
          사진 업로드 하기
        </button>
    </>
  );
};

export default Upload;